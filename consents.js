!(function () {
    const dataKey = document.currentScript.getAttribute('data-key');
    if(dataKey) {

    }
    
    function fetchHtml(){
        var request = new XMLHttpRequest();
        request.open('GET', 'https://raw.githubusercontent.com/meandp589/consents/master/consents.html', true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.body.innerHTML = request.response
                
                var modal = document.getElementById("privacy");
                var btn = document.getElementById("acceptBtn");
                var span = document.getElementsByClassName("pdpa-close")[0];
                btn.onclick = function() {
                    modal.style.display = "block";
                    modal.classList.add("pdpa-show");
                }
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
        }
    }

    function fetchCss(){
        var request = new XMLHttpRequest();
        request.open('GET', 'https://raw.githubusercontent.com/meandp589/consents/master/consents.css', true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.head.innerHTML = ' <style> ' + request.response + ' </style>'
            }
        }
    }
    
    fetchCss();
    fetchHtml();
    

})();
