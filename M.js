let tbody = document.querySelector(".tbody");
let search = document.querySelector(".search");

let add = document.querySelector(".add");
let addForm = document.querySelector(".addForm");
let addModal = document.querySelector(".addModal");
let cancel = document.querySelector(".cancel");

let editForm = document.querySelector(".editForm");
let editModal = document.querySelector(".editModal");
let canceledit = document.querySelector(".canceledit");
let id = document.querySelector(".id");

let api = 'https://6889b24b4c55d5c739532527.mockapi.io/Company';


async function getCompany() {
    try {
        let response = await fetch(api);
        let result = await response.json();
        renderData(result);
    } catch (error) {
        console.log("Fetch error:", error);
    }
}
getCompany();

async function searchcompany(name) {
    try {
        let response = await fetch(`${api}?name=${name}`);
        let result = await response.json();
        renderData(result);
    } catch (error) {
        console.error(error);
    }
}

async function addCompany(data) {
    try {
        await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        getCompany();
    } catch (error) {
        console.error("Add error:", error);
    }
}

async function editcompany(id, data) {
    try {
        await fetch(`${api}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        getCompany();
    } catch (error) {
        console.error("Edit error:", error);
    }
}

async function deleteCompany(id) {
    try {
        await fetch(`${api}/${id}`, {
            method: "DELETE",
        });
        getCompany();
    } catch (error) {
        console.error("Delete error:", error);
    }
}

function renderData(data) {
    tbody.innerHTML = "";

    data.forEach(element => {
        let tr = document.createElement("tr");

        let infoTd = document.createElement("td");
        let avatar = document.createElement("img");
        avatar.src = element.avatar;
        avatar.alt = element.name;
        avatar.width = 40;
        avatar.height = 40;
        avatar.style.borderRadius = "50%";
        avatar.style.marginRight = "10px";

        let infoWrapper = document.createElement("div");
        infoWrapper.style.display = "flex";
        infoWrapper.style.alignItems = "center";

        let textWrapper = document.createElement("div");
        let name = document.createElement("div");
        name.innerHTML = element.name;
        name.style.fontWeight = "600";

        let age = document.createElement("div");
        age.innerHTML = `${element.age} years old`;
        age.style.fontSize = "12px";
        age.style.color = "#777";

        textWrapper.append(name, age);
        infoWrapper.append(avatar, textWrapper);
        infoTd.append(infoWrapper);

        let contactTd = document.createElement("td");
        let email = document.createElement("div");
        email.innerHTML = element.email;
        let phone = document.createElement("div");
        phone.innerHTML = element.phone;
        contactTd.append(email, phone);


        let statusTd = document.createElement("td");
        let status = document.createElement("span");
        status.innerHTML = element.status == true ? "Активен" : "Не активен";
        status.style.backgroundColor = element.status == true ? "green" : "red";
        status.style.color = "white";
        status.style.padding = "4px 10px";
        status.style.borderRadius = "8px";
        status.style.fontWeight = "bold";
        status.style.fontSize = "13px";

        statusTd.append(status);

        let actionsTd = document.createElement("td");
        actionsTd.classList.add("actions");


        let editBtn = document.createElement("i");
        editBtn.innerHTML = "✏️";
        editBtn.title = "Редактировать";
        editBtn.onclick = () => {
            editModal.showModal();
            editForm.avatar.value = element.avatar;
            editForm.fullname.value = element.fullname;
            editForm.age.value = element.age;
            editForm.phone.value = element.phone;
            editForm.email.value = element.email;
            editForm.status.value = element.status;
            id.value = element.id;
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑";
        deleteBtn.onclick = () => deleteCompany(element.id);

        actionsTd.append(editBtn, deleteBtn);

        tr.append(infoTd, contactTd, statusTd, actionsTd);
        tbody.appendChild(tr);
    });
}


add.onclick = () => {
    addModal.showModal();
};

addForm.onsubmit = (e) => {
    e.preventDefault();
    let data = {
        avatar: addForm.avatar.value,
        fullname: addForm.fullname.value,
        age: addForm.age.value,
        phone: addForm.phone.value,
        email: addForm.email.value,
        status: addForm.status.value
    };
    addCompany(data);
    addForm.reset();
    addModal.close();
};
    
cancel.onclick = () => {
    addForm.reset();
    addModal.close();
};

editForm.onsubmit = (e) => {
    e.preventDefault();
    let data = {
        avatar: editForm.avatar.value,
        fullname: editForm.fullname.value,
        age: editForm.age.value,
        phone: editForm.phone.value,
        email: editForm.email.value,
        status: editForm.status.value
    };
    editcompany(id.value, data);
    editForm.reset();
    editModal.close();
};

canceledit.onclick = () => {
    editModal.close();
};

search.oninput = () => {
    let value = search.value.trim()
    searchcompany(value);

};