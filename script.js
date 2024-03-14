const ASN1 = require('node_modules/@lapo/asn1js');
const asn1 = require('node_modules/@lapo/asn1js/asn1');
document.addEventListener('DOMContentLoaded', () => {
    const certificates = loadCertificates();
    console.log('Загруженные сертификаты:', certificates);
});

let btnAdd = document.querySelector('#btn-add');
let btnCancel = document.querySelector('#btn-cancel');
let labelChange = document.querySelector('[for="btn-change"]');
let btnChange = document.querySelector('#btn-change');
let changeCont = document.querySelector('.btn-change-container');
let addSpan = document.querySelector('.btn-add-container span');
let certificatesList = document.querySelector('.certificates-list');

btnAdd.addEventListener('click', changeCertBtn);
btnCancel.addEventListener('click', cancelCertBtn);



function changeCertBtn() {
    btnAdd.style.display = "none";
    addSpan.style.display = "none";
    btnCancel.style.display = "inline-block";
    changeCont.style.display = "flex";
}

function cancelCertBtn() {
    btnAdd.style.display = "inline-block";
    addSpan.style.display = "inline-block";
    btnCancel.style.display = "none";
    changeCont.style.display = "none";
}

btnChange.addEventListener("change", catchCert);


function catchCert () {
    const selectedFile = btnChange.files[0];
    const certificates = [{ filename: selectedFile.name, size: selectedFile.size }];
    saveCertificate(certificates);

}

labelChange.addEventListener("dragover", (e) => {
    e.preventDefault();
})

labelChange.addEventListener("drop", (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const certificates = Array.from(files).map(file => ({ filename: file.name, size: file.size }));
    saveCertificate(certificates);
});

function saveCertificate(certificate) {
    const certificates = JSON.parse(localStorage.getItem('certificates')) || [];
    certificates.push(certificate);
    localStorage.setItem('certificates', JSON.stringify(certificates));
}
function loadCertificates() {
    const storedCertificates = localStorage.getItem('certificates');
    if (storedCertificates) {
        return JSON.parse(storedCertificates);
    }
    return [];
}


