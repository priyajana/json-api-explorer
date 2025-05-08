/**
 * REFERENCES
 * https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript
 * https://jsonplaceholder.typicode.com/guide/
 */


//Create and Send a New Post

document.getElementById('postForm').addEventListener('submit', async function submitForm(e){
    try {
        // To prevent the default behavior of the form submission.
         e.preventDefault();
            const title = document.getElementById("titleInput").value;
             const content = document.getElementById("bodyInput").value;
             const formSuccess = document.querySelector("#formSuccess");

             // Show a “Loading…” message while the fetch is in progress
             formSuccess.innerHTML = `Submitting the post....`;

        await fetch("https://jsonplaceholder.typicode.com/posts",{
            method: 'POST',
            body: JSON.stringify({
              title: title,
              body: content,
              userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then((response) =>  response.json())
        .then((json) => {
                console.log(json)

            // display a confirmation message with the response data
            formSuccess.style.color = "green";
            formSuccess.innerHTML = `The title ${json.title} is posted!`;
        }
            );
        
      } catch (e) {
        console.error(e);
        const formError = document.querySelector("#formError");
        formError.style.color = "red";
        // Display an error message if the fetch fails
        formError.innerHTML = `Facing some errors posting the title ${json.title}!`;
      }
    }

); 



// To Fetch and Display Posts


let fetchBtn = document.getElementById("fetchButton");

fetchBtn.addEventListener("click",()=>
    {
        try {
            const response =  fetch("https://jsonplaceholder.typicode.com/posts",{
                method: 'GET'}).then(function(response){
                return response.json();
            }).then(data=> { 
                const postDiv = document.getElementById("postList");
    
                for(element of data)
                {
                    var header = document.createElement("h4");
                    var paragraph = document.createElement("p");
                    header.innerHTML=`${element.title}`;
                    paragraph.innerHTML=`${element.body}`;
                    postDiv.appendChild(header);
                    postDiv.appendChild(paragraph);
                };
         });
            
          } catch (e) {
            console.error(e);
          }
        });


       