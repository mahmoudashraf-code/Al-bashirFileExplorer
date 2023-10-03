const express = require("express");
const { opendirSync } = require("fs");
const { join } = require("path");

class server {
    root = [];
    app;
    constructor(root) {
        this.root[0] = root;

        this.app = express();
        this.app.use(express.json());
        this.app.use("/bashirAssets", express.static("app"));
        this.app.use(express.static(this.root[0]));

        this.app.use(express.urlencoded({ extended: false }));

        this.app.get("/", (req, res) => {
            res.status(200).sendFile(join(__dirname, "app", "index.html"));
        })

        this.app.post("/api", async (req, res) => {
            if (req.body[0] == "root") req.body = this.root;
            else this.root = req.body;
            res.json({
                files: await this.getFiles(req.body),
                root: this.root
            });
        })

        this.app.listen(3000, () => {
            console.log("http://127.0.0.1:3000")
        });
    }
    async getFiles(path) {
        const dir = opendirSync(join(...path));
        let items = [];
        for await (const dirent of dir)
        {
            let icon = "";
            if (dirent.isDirectory())
            {
                icon = "folder";
            } else "file";
            items.push({
                name: dirent.name,
                icon: icon,
                folder: dirent.isDirectory()
            });
        }
        return items;
    }
}

new server("/");