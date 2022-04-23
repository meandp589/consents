var consentUrl = 'https://www.cookie.makewell.co.th'
!(function () {

    document.head.innerHTML += '<link rel="stylesheet" href="https://www.cookie.makewell.co.th/libs/cookie-go.min.css" type="text/css" />'
    var div = document.createElement('div');
    div.innerHTML = `<div class="cookie-go-main" id="cookie-go" style="display: none;"> <div class="cookie-go-position" style="transform: translateY(0px);"> <div class="cookie-go-border"> <div class="cookie-go-content"> <div> <div class="cookie-go-font-bold">We use cookies</div> <div>We use cookies to improve your experience and performance on our website. You can manage your preferences by clicking "Change Preferences".</div> <div class="cookie-go-float-right"> <a id="cookie-go-consent" href="#" style="margin-right: 10px" class="cookie-go-font-bold cookie-go-link-blue">Change Preferences</a> <button id="cookie-go-accept-all-main" type="button" class="cookie-go-btn cookie-go-btn-primary cookie-go-font-bold">Accept All</button> </div> </div> </div> </div> </div> <div class="cookie-go-modal cookie-go-fade" style="display: none;" id="cookie-go-privacy" tabindex="-1" role="dialog" aria-labelledby="privacyLabel" aria-hidden="true"> <div class="cookie-go-modal-dialog cookie-go-modal-lg" role="document"> <div class="cookie-go-modal-content"> <div class="cookie-go-modal-header" style="padding-bottom: 10px;"> <div class="cookie-go-modal-title cookie-go-mt-2"> <span class="cookie-go-h5 cookie-go-font-bold">Privacy Preference <button type="button" id="cookie-go-accept-all" class="cookie-go-btn cookie-go-btn-primary cookie-go-ml-3 font-bold">Accept All</button></span> </div> <button type="button" class="cookie-go-close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="cookie-go-modal-body"> <div class="cookie-go-card"> <ul class="cookie-go-list-group cookie-go-list-group-flush cookie-go-mt-0"> <li class="cookie-go-list-group-item"> <span class="cookie-go-h6 cookie-go-m-0 cookie-go-font-bold">Necessary <label class="cookie-go-float-right"> <p class="cookie-go-m-0 color-blue">Always Active</p> </label> </span> <p class="cookie-go-mb-0">Necessary cookies are required to help a website usable by enabling core functions and access to secure areas of the website. The website cannot be function properly without these cookies and they are enabled by default and cannot be disabled. </p> </li> <li class="cookie-go-list-group-item"> <span class="cookie-go-h6 cookie-go-m-0 cookie-go-font-bold">Analytics <label class="cookie-go-switch cookie-go-float-right"> <input type="checkbox" id="analytics" class="analytics"> <span class="cookie-go-slider cookie-go-round"></span> </label> </span> <p class="cookie-go-mb-0"> Analytics cookies help website to understand how visitors interact through the website. These cookies help to improve user experiences by collecting and reporting information. </p> </li> <li class="cookie-go-list-group-item"> <span class="cookie-go-h6 cookie-go-m-0 cookie-go-font-bold">Marketing <label class="cookie-go-switch cookie-go-float-right"> <input type="checkbox" id="marketing" class="marketing"> <span class="cookie-go-slider cookie-go-round"></span> </label> </span> <p class="cookie-go-mb-0"> Marketing cookies are used to track visitors across websites to display relevant advertisements for the individual user and thereby more valuable for publishers and third party advertisers. </p> </li> </ul> </div> </div> <div class="cookie-go-modal-footer" style="padding-top: 0px; padding-bottom: 20px;"> <button type="button" id="cookie-go-confirm-my-choices" class="cookie-go-btn cookie-go-btn-primary cookie-go-font-bold">Confirm My Choices</button> </div> </div> </div> </div> </div>`;
    document.body.appendChild(div);

    const dataKey = document.currentScript.getAttribute('data-key');
    if(dataKey) {

        let sessionId = generateSessionId()
        var divMain = document.getElementById("cookie-go");
        var btnAcceptAllMain = document.getElementById("cookie-go-accept-all-main");
        var btnAcceptAll = document.getElementById("cookie-go-accept-all");
        var btnConfirmMyChoices = document.getElementById("cookie-go-confirm-my-choices");
        var modalPrivacy = document.getElementById("cookie-go-privacy");
        var btnConsent = document.getElementById("cookie-go-consent");
        var spanClose = document.getElementsByClassName("cookie-go-close")[0];

        if(getCookie('go_consent')) {
            //recheck
        } else {
            divMain.style.display = "block";
        }
       
        let goConsent = {
            "consent":[
                {
                    "consent_id": "necessary",
                    "value": "accept"
                },
                {
                    "consent_id": "analytics",
                    "value": "accept"
                },
                {
                    "consent_id": "marketing",
                    "value": "accept"
                }
            ],
            "session_id": sessionId,
        }

        let cookieConsent = {
            ...goConsent,
            "scriptVersion":1,
            "consentVersion":"1",
            "lastUpdated": new Date().getTime()
        }

        //AcceptAllMain
        btnAcceptAllMain.onclick = function() {
            divMain.style.display = "none";
            createCookie('go_consent', JSON.stringify(cookieConsent))
            post(consentUrl + '/api/v1/cookie/consent', goConsent, { 'X-Session-Id': sessionId })
        }

        //AcceptAll
        btnAcceptAll.onclick = function() {
            divMain.style.display = "none";
            modalPrivacy.style.display = "none";
            createCookie('go_consent', JSON.stringify(cookieConsent))
            post(consentUrl + '/api/v1/cookie/consent', goConsent, { 'X-Session-Id': sessionId })
        }

        //ConfirmMyChoices
        btnConfirmMyChoices.onclick = function() {
            if(!document.querySelector(".analytics").checked) {
                goConsent.consent[1] = {
                    "consent_id": "analytics",
                    "value": "deny"
                }
            }
            if(!document.querySelector(".marketing").checked) {
                goConsent.consent[1] = {
                    "consent_id": "marketing",
                    "value": "deny"
                }
            }
            divMain.style.display = "none";
            modalPrivacy.style.display = "none";
            createCookie('go_consent', JSON.stringify(cookieConsent))
            post(consentUrl + '/api/v1/cookie/consent', goConsent, { 'X-Session-Id': sessionId })
        }

        //Modal
        btnConsent.onclick = function() {
            modalPrivacy.style.display = "block";
            modalPrivacy.classList.add("cookie-go-show");
        }
        spanClose.onclick = function() {
            modalPrivacy.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalPrivacy) {
                modalPrivacy.style.display = "none";
            }
        }

    } else {
        console.error('Key missing')
    }

})();

function post(url, body, headers = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }, 
        body: JSON.stringify(body)
    }).then(res => {
        return res
    }).catch(e => {
        console.error(e)
    })
}

function generateSessionId () {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}