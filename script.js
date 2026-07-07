const GROQ_API_KEY = "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"; // Do not hard-code a real secret here.


const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");



sendBtn.addEventListener("click", sendMessage);



userInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        sendMessage();

    }

});




async function sendMessage(){


    const message = userInput.value.trim();


    if(message === "") return;



    addMessage("You", message);



    userInput.value = "";



    const loading = document.createElement("p");


    loading.id = "loading";


    loading.innerHTML =
    "<b>Vishal Dharsan AI:</b> Thinking<span class='dots'>...</span>";



    chatBox.appendChild(loading);


    chatBox.scrollTop =
    chatBox.scrollHeight;





    try{


        const response = await fetch(

            "https://api.groq.com/openai/v1/chat/completions",

            {

                method:"POST",


                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    `Bearer ${GROQ_API_KEY}`

                },



                body:JSON.stringify({


                    model:
                    "llama-3.3-70b-versatile",



                    messages:[


                        {

                            role:"system",

                            content:
                            "You are Vishal Dharsan AI. Always introduce yourself as Vishal Dharsan AI. Be friendly, intelligent and helpful."

                        },


                        {

                            role:"user",

                            content:message

                        }


                    ],



                    temperature:0.7,


                    max_tokens:1024


                })

            }

        );





        const data = await response.json();




        document.getElementById("loading")?.remove();




        if(data.error){


            addMessage(
                "Error",
                data.error.message
            );


            return;

        }






        const reply =
        data.choices[0].message.content;




        typeMessage(
            "Vishal Dharsan AI",
            reply
        );



    }


    catch(error){



        document.getElementById("loading")?.remove();



        addMessage(
            "Error",
            error.message
        );


    }


}







// Normal message display

function addMessage(sender,message){



    const p=document.createElement("p");



    p.innerHTML =
    `<b>${sender}:</b> ${message}`;



    chatBox.appendChild(p);



    chatBox.scrollTop =
    chatBox.scrollHeight;



}







// AI typing animation

function typeMessage(sender,message){



    const p=document.createElement("p");



    p.innerHTML =
    `<b>${sender}:</b> `;



    chatBox.appendChild(p);



    let index = 0;



    const typing = setInterval(()=>{


        p.innerHTML =
        `<b>${sender}:</b> ${message.substring(0,index)}`;



        index++;



        chatBox.scrollTop =
        chatBox.scrollHeight;




        if(index > message.length){


            clearInterval(typing);


        }



    },20);



}
// ======================
// AI PASSWORD SYSTEM
// ======================


const correctPassword = "vd2.0"; 
// Change this password


const lockScreen =
document.getElementById("lockScreen");


const passwordInput =
document.getElementById("passwordInput");


const unlockBtn =
document.getElementById("unlockBtn");


const errorMsg =
document.getElementById("errorMsg");



unlockBtn.addEventListener("click",()=>{


    if(passwordInput.value === correctPassword){


        lockScreen.style.display="none";


    }

    else{


        errorMsg.innerHTML=
        "❌ Wrong Password";


        passwordInput.value="";


    }


});



passwordInput.addEventListener("keypress",(e)=>{


    if(e.key==="Enter"){

        unlockBtn.click();

    }


});