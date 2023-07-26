function ocultar () {
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('botones').style.display = 'none';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('novedades').style.display = 'block';
    document.getElementById('close').style.display = 'block';
}

function mostrar () {
    document.getElementById('titulo').style.display = 'block';
    document.getElementById('botones').style.display = 'flex';
    document.getElementById('titulo').style.display = 'block';
    document.getElementById('novedades').style.display = 'none';
    document.getElementById('close').style.display = 'none';
}