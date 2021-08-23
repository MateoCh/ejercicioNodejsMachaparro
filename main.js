const { default: axios } = require("axios");
const fs = require("fs");
const http= require("http");
const url=require("url");
let proveedores=[];
let clientes=[];


http.createServer((req, res)=>{
    const dest=url.parse(req.url, true);
    if(dest.pathname.includes("api/proveedores"))
    {
        axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json")
        .then(function({data}){
            proveedores=data;
            let tablaProv="";
            proveedores.forEach(prov => {
                let msg="<tr> \n";
                msg+="<th scope=\"row\">"+prov.idproveedor+"</th> \n";
                msg+="<td>"+prov.nombrecompania+"</td> \n";
                msg+="<td>"+prov.nombrecontacto+"</td>\n";
                msg+="</tr> \n";
                tablaProv+=msg;
            });
            fs.readFile("index.html",(err,data)=>{
                let info=data.toString();
                info=info.replace("{{replace1}}", "Listado proveedores");
                info=info.replace("{{replace2}}",tablaProv);
                res.writeHead(200, {"Content-Type":"text/html"});
                res.end(info);
            })
        });
    }
    else if(dest.pathname.includes("api/clientes"))
    {
        axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json")
        .then(function({data}){
            clientes=data;
            let tablaCli="";
            clientes.forEach(clie => {
                let msg="<tr> \n";
                msg+="<th scope=\"row\">"+clie.idCliente+"</th> \n";
                msg+="<td>"+clie.NombreCompania+"</td> \n";
                msg+="<td>"+clie.NombreContacto+"</td>\n";
                msg+="</tr> \n";
                tablaCli+=msg;
            });
            fs.readFile("index.html",(err,data)=>{
                let info=data.toString();
                info=info.replace("{{replace1}}", "Listado clientes");
                info=info.replace("{{replace2}}",tablaCli);
                res.writeHead(200, {"Content-Type":"text/html"});
                res.end(info);
            })
        });
    }
    else
    {
        res.writeHead(400);
        res.end("Esta pagina no existe :(")
    }

}).listen(8081);


