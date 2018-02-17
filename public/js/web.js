window.onload = function () {
    file.onchange = function (ev) {
        const formdata = new FormData();
        console.dir(`${ev.target.value}   ${ev.target.files[0]}`);
        formdata.append('file', ev.target.files[0], ev.target.value);
        fetch("/web", {
            method: "POST",
            body: formdata,
            cache: false,
            contentType: false,
            processData: false
        }).then( res => {
            console.log('ok');
        }).catch( err => {
            console.error(err);
        });
    }
}