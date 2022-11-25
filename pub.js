
const mqtt = require("mqtt")
const fs = require("fs")
//const broker = "mqtt://mqtt.flespi.io:1883"
// const broker = 'mqtt://test.mosquitto.org:1883'

// id_integer,status_boolean,warna_boolean,latitude_float,longitude_float
const options = {
	port: 1883,
	host: 'mqtt.flespi.io',
	clientId: "busses",
	username: 'ryzDiqhw7pSOtWxB15MjrMn2StWFFF8U4ylaMruKGbmYVHpND1WUC9LkrvNU0MDS'
}

client = mqtt.connect(options)

const topic = "bikun"
// const secret = "antum-wadidaw"


client.on("connect", () => {
	console.log("PUBLISHER CONNECTED!")
	fs.readFile("files/dummyList1.json", (err, data) => {
		if (err) throw err

		setInterval(() => {
			//publish data
			client.publish(topic, ((Math.floor(Math.random() * 10) + 1) + ';1;' + (Math.floor(Math.random() * 2)) + ';-6.360276705442483;106.82864067258957'))
		}, 1000)
	})
})
