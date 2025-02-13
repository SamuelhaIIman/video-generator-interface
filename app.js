const API_KEY = "";
const submitIcon = document.querySelector("#submit-icon");
const personInput = document.querySelector("input");
const imageSection = document.querySelector(".image-section");

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            prompt: personInput.value,
            n: 4,
            size: "512x512"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await response.json();
        console.log(data);

        data?.data.forEach(imageObject => {
            const ImageContainer = document.createElement("div");
            ImageContainer.classList.add('image-container');
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", imageObject.url);
            ImageContainer.append(imageElement);
            imageSection.append(ImageContainer);
        })
    } catch (error) {
        console.log(error)
    }
}

submitIcon.addEventListener('click', getImages);