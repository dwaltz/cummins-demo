const bridgeInputStorage = localStorage.getItem('bridge_input');
let authToken = localStorage.getItem('authToken') || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJETTJSVUV3UVVRM01ERkdNREJFTXpnMU0wTXdRVGswT1RKRE5EbEZNRVU1TWpkRVFVRXhOUSJ9.eyJodHRwczovL21ldGFjeC5jb20vb3JnYW5pemF0aW9uX2lkIjoiMmE2ZGI3NDVkYzQ0ZDljMTI1NDQ4MGM1IiwiaXNzIjoiaHR0cHM6Ly9pbnRlZ3JhdGlvbi5sb2dpbi5tdGN4Lm1lLyIsInN1YiI6ImF1dGgwfDVlNWZmNDA4NDQwZDU0MGRlMjdiZjgzYiIsImF1ZCI6ImludGVncmF0aW9uLm10Y3gubWUvYXV0aCIsImlhdCI6MTYxMjI4NzYzOSwiZXhwIjoxNjEyMjkxMjM5LCJhenAiOiJSZ250SHpnMWhaSW1BS25CbnEzb0JXZlBHTjAwaHgwbyIsInNjb3BlIjoidHlwZTp1c2VyIHR5cGU6c2hhcmVkZG9jdW1lbnQifQ.adCRVnQdJDS_c6TSGbbcvAtVT9b8pHhL0wIysYPMkxKgJsfXyx02_qLDBlYOdfHP8_Ovt3lD9QRlfLI0sN7e_DVCDc3dmUok58oTExGzp2NftOD3lpArtnbW_FxEe2nI5oOJyoeBPFNuJjsUe6Tn9ixrWzRCS4LlAr1c15rmW2UKQlEMildAyyWFYHrbtTDX7uk1XcvqZD6ppoXmrzCHPEqlJHbfw3VPfzQAAbS66wQjLi6D5APSGmATwF_0Ld2FzvyxdlqiqGRBjRfnhS0_AM3pITwDPnJgsUoj2vAITAKyFh1zBbcDjTS0GGQBV8r3tD-rKGVneSd_oOnMrOtHGg';
let input = (bridgeInputStorage && JSON.parse(bridgeInputStorage)) || {
    companyId: "c36f9a064b678ae08b7ef4f5",
    personEmail: "john_doe2@gmail.com"
};
payload = `{\"operationName\":\"INVITE_PERSON_TO_SHARED_DOCUMENT\",\"variables\": ${JSON.stringify(input)},\"query\":\"mutation INVITE_PERSON_TO_SHARED_DOCUMENT($companyId: ID, $sharedDocumentId: ID, $personEmail: String, $companyAlternateKeyName: String, $companyAlternateKeyValue: ID, $personId: String, $personDetails: CreatePersonDetails ) {\\n  invitePersonToSharedDocument(input: {companyId: $companyId, personEmail: $personEmail, sharedDocumentId: $sharedDocumentId, companyAlternateKeyName: $companyAlternateKeyName, companyAlternateKeyValue: $companyAlternateKeyValue, personId: $personId, personDetails: $personDetails}) {\\n    ... on InvitePersonToSharedDocumentResponse_Success {\\n      requestId\\n      sharedDocument {\\n        id\\n        createdOn\\n        sharedDocumentIframeSrc\\n        invites {\\n          id\\n          invitee {\\n            id\\n            email\\n            __typename\\n          }\\n          invitedDate\\n          sharedDocumentIframeSrc\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`;
let baseUrl = localStorage.getItem('bridge_base_url') || 'https://integration.api.mtcx.me';

function setBridgeInviteInput({
    displayEmail,
    authToken: bridgeAuthToken,
    input: bridgeInput,
    environment
}) {
    authToken = bridgeAuthToken || authToken;
    input = bridgeInput || input;

    if (environment) {
        let newBaseUrl = 'https://integration.api.mtcx.me';

        if (environment === 'dev') {
            newBaseUrl = 'https://dev.api.mtcx.me';
        } else if (environment === 'prod') {
            newBaseUrl = 'https://api.metacx.com';
        } else if (environment === 'int') {
            newBaseUrl = 'https://integration.api.mtcx.me';
        }

        baseUrl = newBaseUrl;
        localStorage.setItem('bridge_base_url', newBaseUrl);
    }

    localStorage.setItem('bridge_input', JSON.stringify(input));
    localStorage.setItem('authToken', authToken);

    if (displayEmail) {
        localStorage.setItem('display_email', displayEmail);
        document.querySelector('#dropdownMenuButton').innerHTML = displayEmail;
    }

    payload = `{\"operationName\":\"INVITE_PERSON_TO_SHARED_DOCUMENT\",\"variables\": ${JSON.stringify(input)},\"query\":\"mutation INVITE_PERSON_TO_SHARED_DOCUMENT($companyId: ID, $sharedDocumentId: ID, $personEmail: String, $companyAlternateKeyName: String, $companyAlternateKeyValue: ID, $personId: String, $personDetails: CreatePersonDetails ) {\\n  invitePersonToSharedDocument(input: {companyId: $companyId, personEmail: $personEmail, sharedDocumentId: $sharedDocumentId, companyAlternateKeyName: $companyAlternateKeyName, companyAlternateKeyValue: $companyAlternateKeyValue, personId: $personId, personDetails: $personDetails}) {\\n    ... on InvitePersonToSharedDocumentResponse_Success {\\n      requestId\\n      sharedDocument {\\n        id\\n        createdOn\\n        sharedDocumentIframeSrc\\n        invites {\\n          id\\n          invitee {\\n            id\\n            email\\n            __typename\\n          }\\n          invitedDate\\n          sharedDocumentIframeSrc\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`;
}

function loadBridge() {
    document.querySelector('#bridge').style.display = "block";

    fetch(
        `${baseUrl}/api?operationName=INVITE_PERSON_TO_SHARED_DOCUMENT`,
        {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                authorization:
                    `Bearer ${authToken}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            referrer: "https://integration.api.mtcx.me/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: payload,
            method: "POST",
            mode: "cors"
        }
    )
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
    console.log('test');
};