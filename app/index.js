onload = () => {
    getDir(["root"]);
}

function getDir(path) {
    fetch("/api", {
        method: "POST",
        body: JSON.stringify(path),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.json();
    }).then(data => {
        folders.innerHTML = "";
        items.innerHTML = "";
        for (let i = 0; i < data.root.length; i++) {
            let li = document.createElement("li");
            if (i == 0) li.appendChild(createImg("bashirAssets/home.svg"));
            else
                li.innerHTML = `<h4>${data.root[i]}</h4?`;
            li.addEventListener("click", () => {
                getDir(data.root.slice(0, i + 1));
            });
            li.classList.add("item");
            folders.appendChild(li);
            folders.appendChild(createImg("bashirAssets/arrow.svg"));
        }
        for (let i = 0; i < data.files.length; i++) {
            let li = document.createElement("li");
            if (data.files[i].folder)
                li.appendChild(createImg("bashirAssets/folder.svg"));
            else
                li.appendChild(createImg("bashirAssets/file.svg"));
            li.innerHTML += `<h3>${data.files[i].name}</h3>`;
            li.addEventListener("click", () => {
                if (data.files[i].folder) {
                    getDir([...data.root, data.files[i].name]);
                } else {
                    window.open(`${location.origin}/${data.root.slice(1)}/${data.files[i].name}`);
                }
            });
            items.appendChild(li);
        }
    }).catch(err => {
        console.log(err)
    })
}
function createImg(src) {
    let img = document.createElement("img");
    img.src = src;
    return img
}
