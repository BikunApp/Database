// https://www.youtube.com/watch?v=PFJNJQCU_
const mqtt = require("mqtt")
const options = {
	port: 1883,
	host: "mqtt.flespi.io",
	clientId: "bussez",
	username:
		"ryzDiqhw7pSOtWxB15MjrMn2StWFFF8U4ylaMruKGbmYVHpND1WUC9LkrvNU0MDS",
}
const topic = "bikun"
const client = mqtt.connect(options)


client.on("connect",  () => {
	
	console.log("SUBSCRIBER CONNECTED!")
	console.log("keprint sekali aja cuk")
    setInterval(() => {
		
        client.publish(topic, "asede kontol")
    }, 1000)
})
