// https://www.youtube.com/watch?v=PFJNJQCU_lo
const haversine = require("haversine")
const dotenv = require("dotenv")
dotenv.config()
const fs = require("fs")
const { google } = require("googleapis")
const mqtt = require("mqtt")
const options = {
	port: 1883,
	host: "mqtt.flespi.io",
	clientId: "database",
	username:
		"ryzDiqhw7pSOtWxB15MjrMn2StWFFF8U4ylaMruKGbmYVHpND1WUC9LkrvNU0MDS",
}
const topic = "bikun"
const clientz = mqtt.connect(options)

clientz.on("message", (topic, message) => {
	// const auth = new google.auth.GoogleAuth({
	// 	keyFile: "credentials.json",
	// 	scopes: "https://www.googleapis.com/auth/spreadsheets",
	// })
	// const client = auth.getClient()
	// const googleSheets = google.sheets({ version: "v4", auth: client })
	// const spreadsheetId = "1BqSc4ra82waG4DOgXw2UOGUfdOA-Y7Seiiwb5bKjSqM"
	// const getRows =  googleSheets.spreadsheets.values.get({
	//     auth: auth,
	//     spreadsheetId: spreadsheetId,
	// range : "Database"})
	//id_integer;status_boolean;warna_boolean;latitude_float;longitude_float
	// read JSON from dummyCoordinate.json to get the coordinate of the bikun
})
clientz.on("connect", () => {
	clientz.subscribe(topic)
	console.log("SUBSCRIBER CONNECTED!")

	let i = 0
	let jarakTempuh = 0

	const data = fs.readFileSync("dummyCoordinate.json")
	const dummyCoordinate = JSON.parse(data)
	let coordinateNow = dummyCoordinate[i]

	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	})
	const client = auth.getClient()

	const googleSheets = google.sheets({ version: "v4", auth: client })
	const spreadsheetId = process.env.SPREADSHEET_ID
	//update row 2 column 3 with the value of coordinateNow
	console.log(spreadsheetId)

	setInterval( () => {
		if (i >= dummyCoordinate.length)
			return
		jarakTempuh += haversine(coordinateNow, dummyCoordinate[i], {
			unit: "meter",
		})
		coordinateNow = dummyCoordinate[i]
		console.log(jarakTempuh + " meter")
		i++
		
	}, 1000)
	setInterval( () => {
		googleSheets.spreadsheets.values.update({
			auth: auth,
			spreadsheetId: spreadsheetId,
			range: "Database!C2",
			valueInputOption: "USER_ENTERED",
			resource: {
				values: [[jarakTempuh]],
			},
		})
	},5000)
})
