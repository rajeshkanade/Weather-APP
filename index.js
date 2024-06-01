const http = require("http");
const fs = require("fs");
const path = require("path");

const requests = require("requests")
const HTMLFile = fs.readFileSync(`${__dirname}/index.html`, "utf-8")
 

const replaceVal = (oldValue,newValue)  =>{
  // console.log(oldValue)
  let tempreture = oldValue.replace("{%tempreture%}",((newValue.main.temp)-276).toFixed(2));
  tempreture = tempreture.replace("{%temMin%}",((newValue.main.temp_min)-276).toFixed(2));
  tempreture = tempreture.replace("{%tempMax%}",((newValue.main.temp_max)-276).toFixed(2));
  tempreture = tempreture.replace("{%Location%}",newValue.name);
  tempreture = tempreture.replace("{%country%}",newValue.sys.country);
  tempreture = tempreture.replace("{%WeatherCOndition%}",newValue.weather[0].main)
  console.log(newValue.weather[0].main)

  // console.log(tempreture)
  return tempreture;
}

const server = http.createServer((req, res) => {
    
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?lat=19.0833&lon=74.7333&appid=c13bb5e42a35f637a83cabfe8879f117")
        .on("data", (chunks) =>{
            // console.log(chunks)
            let objData = JSON.parse(chunks);
            // console.log(objData)
            let arrData = [objData]
            // console.log(arrData)

            let realTimeData = arrData.map((value) => replaceVal(HTMLFile,value)).join("")

            res.writeHead(200 , {"Content-type" : "text/html"})
            // console.log(realTimeData)
            res.write(realTimeData)
        } )
        .on("end", (err) =>{
            if(err){
              res.write("Error Occurred...!")
              return console.log("Something wrong on the server ",err)
            } 
            else console.log("run successfully...");
            res.end("run successfully")
            
        } )
    }
    else {
      // Serve static files
      const filePath = path.join(__dirname, req.url);
      const extname = path.extname(filePath);
      let contentType = "text/html";
      
      // Set the content type based on the file extension
      switch (extname) {
        case ".js":
          contentType = "application/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".ico":
          contentType = "image/x-icon";
          break;
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code == "ENOENT") {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Not Found");
          } else {
            res.writeHead(500);
            res.end("Internal Server Error");
          }
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        }
      });
  
    }
  
  });

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});


