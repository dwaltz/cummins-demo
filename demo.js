const bridgeInputStorage = localStorage.getItem('bridge_input');
let input = {
    sharedDocumentId: "9e310d3aaf49528ab71701f5",
    personEmail: "john_doe2@gmail.com"
};

function setBridgeInviteInput({
    displayEmail,
    input: bridgeInput,
}) {
    input = bridgeInput || input;

    localStorage.setItem('bridge_input', JSON.stringify(input));
    localStorage.setItem('authToken', authToken);

    if (displayEmail) {
        localStorage.setItem('display_email', displayEmail);
        document.querySelector('#dropdownMenuButton').innerHTML = displayEmail;
    }
}

function loadBridge() {
    document.querySelector('#bridge').style.display = "block";

    fetch(
        'https://aqueous-ravine-67838.herokuapp.com/invitePersonToSharedDocument',
        {
            method: "POST",
            headers: {
                accept: "*/*",
                "content-type": "application/json",
                "cache-control": "no-cache",
                pragma: "no-cache",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            body: JSON.stringify({
                input
            })
        })
        .then((res) => res.json())
        .then((res) => {
            const invites =
                res?.data?.invitePersonToSharedDocument?.sharedDocument?.invites;

            if (invites && invites[0]) {
                console.log(invites[0].sharedDocumentIframeSrc);
                document.querySelector("iframe").src =
                    invites[0].sharedDocumentIframeSrc;
            }
        });
}

window.onload = () => {
    document.querySelector('#dropdownMenuButton').innerHTML = localStorage.getItem('display_email') || 'john_doe@gmail.com';
};