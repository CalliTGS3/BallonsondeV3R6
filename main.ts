let Laufzeit = 0
let Uhrzeit = ""
let Laenge = ""
let Breite = ""
let Hoehe = ""
let Temp = 0
let Temp2 = 0
let Luftdruck = 0
let Luftfeuchte = 0
let Lichtstaerke = 0
let UV = 0
let Infrarot = 0
let Leistung = 0
let UV2 = 0
function Senden () {
    radio.sendString("LZ:" + Laufzeit)
    radio.sendString("UZ:" + Uhrzeit)
    radio.sendString("LA:" + Laenge)
    radio.sendString("BR:" + Breite)
    radio.sendString("HO:" + Hoehe)
    radio.sendString("TE:" + Temp)
    radio.sendString("T2:" + Temp2)
    radio.sendString("LU:" + Luftdruck)
    radio.sendString("LF:" + Luftfeuchte)
    radio.sendString("LI:" + Lichtstaerke)
    radio.sendString("UV:" + UV)
    radio.sendString("U2:" + UV2)
    radio.sendString("IR:" + Infrarot)
    radio.sendString("PS:" + Leistung)
}
function Messen () {
    Laufzeit = input.runningTime() / 1000
    Uhrzeit = NEO6M_GPS.getGPSTime()
    Breite = NEO6M_GPS.getGPSLatitude()
    Laenge = NEO6M_GPS.getGPSLongitude()
    Hoehe = NEO6M_GPS.getAltitude()
    Temp = BME280.temperature(BME280_T.T_C)
    Temp2 = PCT2075.getTemp()
    Luftdruck = BME280.pressure(BME280_P.Pa)
    Luftfeuchte = BME280.humidity()
    Lichtstaerke = SI1145.readLight()
    UV = SI1145.readUltraVioletIndex()
    UV2 = VEML6070.getUVI()
    Infrarot = SI1145.readInfraRed()
    Leistung = ina219.getPowerW()
}
function LogdateiOeffnen (Dateiname: string) {
    Qwiic_Openlog.createFile(Dateiname)
    Qwiic_Openlog.openFile(Dateiname)
    Qwiic_Openlog.writeString("Laufzeit;Uhrzeit;Laenge;Breite;Hoehe;")
    Qwiic_Openlog.writeString("Temperatur;T2;Luftdruck;Luftfeuchte;")
    Qwiic_Openlog.writeLine("Helligkeit;Ultraviolett;UV2;Infrarot;Solar")
}
function Grundeinstellungen () {
    Leistung = 0
    Infrarot = 0
    UV = 0
    Lichtstaerke = 0
    Luftfeuchte = 0
    Luftdruck = 0
    Temp = 0
    Laufzeit = 0
    radio.setGroup(1)
}
