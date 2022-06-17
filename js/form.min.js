"use strict";
window.onload = () => {
    // opec/close form
    (document.getElementById("reg-code").onclick = function () {
      document.getElementById("overlay").classList.toggle("overlay--active"),
        document.getElementById("modal").classList.toggle("modal--active");
    }),
    (document.getElementById("close-btn").onclick = function () {
      document.getElementById("overlay").classList.remove("overlay--active"),
        document.getElementById("modal").classList.remove("modal--active");
    }),
    document.getElementById("overlay").addEventListener("click", function (e) {
      "overlay" == e.target.id &&
        (this.classList.remove("overlay--active"),
          document.getElementById("modal").classList.remove("modal--active"));
    });


    //Set country
    let
        countries   = [],
        xhr         = new XMLHttpRequest(),
        select_List = document.getElementById("select-list");
    //Load countries
    xhr.open('GET', "countries.txt");
    xhr.responseType = 'text';
    xhr.onload = () => {
        countries = xhr.response.split(', ');
        for(let country of countries){
            let option = document.createElement("option");
            //option.className = "select-item";
            option.innerText = country;
            option.value = country;

            //Add element to autocomplete
            select_List.appendChild(option);
        }
    };

    xhr.send();

    //Masked Inputs
    $(".phone").mask("380999999999", { placeholder: "380_________" });

    //Send form
    let
        formBlock = document.getElementsByTagName("form")[0],
        formBlock_CodeInput = formBlock.querySelector("input[name='code']");

    formBlock.addEventListener("submit", async(event) => {

        event.preventDefault();

        //Values
        let
            xhr = new XMLHttpRequest(),
            data = new FormData(event.target),
            url = formBlock.getAttribute("action"),
            method = formBlock.getAttribute('method'),
            result_Block = formBlock.querySelector(".result-text"),
            submit_button = formBlock.querySelector("input[type='submit'], button[type='submit']"),
            loader = formBlock.getElementsByClassName("loader")[0];

        //Disable submit-button
        submit_button.disabled = true;
        //Show loader
        loader.classList.add('loader--active');

        grecaptcha.ready(function() {
            grecaptcha.execute('6LchsEcbAAAAAAP2kJyZ05L-V82IoKp9E43qU19M', {action: 'submit'}).then(function(token) {

                //Add token
                data.append('g-recaptcha-response', token);

                //Check country
                if(countries.indexOf(data.get("selected_country")) == -1){
                    formBlock.querySelector("input[name='selected_country']").value = "";
                    return false;
                }

                //Send request
                xhr.open(method, url);
                xhr.responseType = 'text';
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("redirect", "follow");
                xhr.setRequestHeader("referrerPolicy", "no-referrer");
                xhr.setRequestHeader("mode", "cors");
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                xhr.onload = function() {
                    //Active submit-button
                    submit_button.disabled = false;
                    //Hide loader
                    loader.classList.remove('loader--active');

                    if (this.status >= 200 && this.status < 300) {
                        result_Block.style.color = "#44944A";
                    } else {
                        result_Block.style.color = "#F13A13";

                        //Clear input
                        formBlock_CodeInput.value = null;
                        //grecaptcha.reset();
                    }
                    result_Block.innerHTML = (this.status >= 500) ? "Час очікування відповіді сервера минув" : this.response;
                }

                xhr.send(data);
            });
        });
    });
};



//# sourceMappingURL=form.min.js.map
