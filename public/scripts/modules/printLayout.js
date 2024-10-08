async function printOfflineIcons() {
    try {
        let template = "";
        let offline = await fetch('/api/sessions/online');
            offline = await offline.json();
            if (offline.statusCode !== 200) {
                console.log('Offline', offline)
                template = `
                <a class="nav-link active" aria-current="page" href="/pages/login.html">Login</a>
                <a class="nav-link active" aria-current="page" href="/pages/register.html">Register</a>
                <a class="nav-link active" aria-current="page" href="/pages/verify.html">Verification</a>
                `;
                document.querySelector('#print-offline-icons').innerHTML = template;
            }    
    } catch (err) {
        console.error('Error printing offline icons')     
    }
};

async function printOnlineIcons() {
    try {
        let template = "";
        let online = await fetch('/api/sessions/online');
        online = await online.json();
        const { role } = online
        if (online.statusCode === 200) {
            console.log('Online', online);
            switch (role) {
                case 0:
                    template = `
                    <a class="nav-link active" aria-current="page" href="/pages/user.html">Profile</a>
                    <a class="nav-link active" aria-current="page" href="/pages/cart.html">Cart</a>
                    <button class="nav-link active" type="button" id="logout-btn" style="border: solid 1px; border-radius: 4px; margin-left: 4px;">Log Out</button>
                    `
                    break;
                case 1:
                    template = `
                    <a class="nav-link active" aria-current="page" href="/pages/user.html">Profile</a>
                    <a class="nav-link active" aria-current="page" href="/pages/new.html">Publish</a>
                    <button class="nav-link active" type="button" id="logout-btn" style="border: solid 1px; border-radius: 4px; margin-left: 4px;">Log Out</button>
                    `
                    break;
                case 2:
                    template = `
                    <a class="nav-link active" aria-current="page" href="/pages/user.html">Profile</a>
                    <a class="nav-link active" aria-current="page" href="/pages/cart.html">Cart</a>
                    <a class="nav-link active" aria-current="page" href="/pages/new.html">Sell</a>
                    <a class="nav-link active" aria-current="page" href="/pages/publications.html">Publications</a>
                    <button class="nav-link active" type="button" id="logout-btn" style="border: solid 1px;border-radius: 4px; margin-left: 4px;">Log Out</button>
                    `
                    break;
            }
            document.querySelector('#print-online-icons').innerHTML = template
            document.querySelector('#logout-btn').onclick = async () => {
                const opts = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                };
                let response = await fetch('/api/sessions/logout', opts);
                response = await response.json()
                if (response.statusCode === 200) {
                    location.replace('/')
                    return alert(response.message);
                };
            };
        }    
    } catch (err) {
        console.error('Error printing online icons') 
    }
}

export { printOfflineIcons, printOnlineIcons };


