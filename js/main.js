var cookieCount = 0;
var friendCount = 0;
var bakerCount = 0;
var grannyCount = 0;
var gorillaCount = 0;
var gorillaPrice = 1200;
var gorillaLimit = 10;
var miceCount = 0;
var miceLimit = 7;
var micePrice = {
	"price": 300,
	"next": {
		"price": 400,
		"next": {
			"price": 500,
			"next": {
				"price": 600,
				"next": {
					"price": 1000,
					"next": {
						"price": 3000,
						"next": {
							"price": 8000,
							"next": null
						}
					}
				}
			}
		}
	}
}
var cmCount = 0;
var gorillaHordeMultiplier = 1;
var holdClickSpeed = 4;
var bigCookieDown = 0;
var startTime = null;
var endTime = null;
var complete = false;

cmObjects = [];

function main()
{
	cookie_count.innerHTML = cookieCount;
}

function bakeCookies()
{
	var angle = Math.random() * Math.PI * 2;
	var x = Math.cos(angle) * 128;
	var y = Math.sin(angle) * 128;
	
	var el = document.createElement("img");
	el.src = "img/cuuki.png";
	el.classList.add("baked_cookie");
	el.setAttribute('draggable', false);
	el.style.left = "calc((50vw - 25px) + " + x + "px)";
	el.style.top = "calc((50vh - 25px) + " + y + "px)";
	
	setTimeout(function() {
		el.classList.add("visible");
	}, 10);
	setTimeout(function() {
		el.classList.add("moved");
	}, 310);
	
	baked_cookies.appendChild(el);
	setTimeout(function() {
		baked_cookies.removeChild(el);
	}, 750);
}

function updateSecondSpeed()
{
	var answer = (friendCount / 15) + (bakerCount / 1.4) + (grannyCount / 0.13);
	
	for (var obj of cmObjects)
	{
		answer += obj / 0.09;
	}
	
	second_speed.innerHTML = "Cookies Per Second - " + Math.floor(answer);
}

function updateClickSpeed()
{
	click_speed.innerHTML = "Cookies Per Click - " + (Math.pow(2, gorillaCount) * gorillaHordeMultiplier);
}

function bigCookieClick()
{
	if (startTime == null)
	{
		startTime = Date.now();
	}
	
	cookieCount += Math.pow(2, gorillaCount) * gorillaHordeMultiplier;
	cookie_count.innerHTML = cookieCount;
	bakeCookies();
}

big_cookie.onclick = function()
{
	bigCookieClick();
}

big_cookie.onmousedown = function()
{
	bigCookieDown = true;
}

big_cookie.onmouseup = function()
{
	bigCookieDown = false;
}

var clickLoop = function()
{
	if (bigCookieDown)
	{
		bigCookieClick();
	}
	
	setTimeout(clickLoop, 1000 / holdClickSpeed);
}

setTimeout(clickLoop, 1000 / holdClickSpeed);



friend_new.onclick = function()
{
	if (cookieCount >= 8)
	{
		cookieCount -= 8;
		cookie_count.innerHTML = cookieCount;
		friendCount++;
		friend_count.innerHTML = "Friends: " + friendCount;
		updateSecondSpeed()
	}
}

baker_new.onclick = function()
{
	if (cookieCount >= 72)
	{
		cookieCount -= 72;
		cookie_count.innerHTML = cookieCount;
		bakerCount++;
		baker_count.innerHTML = "Bakers: " + bakerCount;
		updateSecondSpeed()
	}
}

granny_new.onclick = function()
{
	if (cookieCount >= 650)
	{
		cookieCount -= 650;
		cookie_count.innerHTML = cookieCount;
		grannyCount++;
		granny_count.innerHTML = "Grannys: " + grannyCount;
		updateSecondSpeed()
	}
}

cm_new.onclick = function()
{
	if (cookieCount >= 20000)
	{
		cookieCount -= 20000;
		cookie_count.innerHTML = cookieCount;
		cmCount++;
		cm_count.innerHTML = "CMs: " + cmCount;
		cmObjects.push(1); //33
		updateSecondSpeed()
	}
}

gorilla_new.onclick = function()
{
	if (cookieCount >= gorillaPrice && gorillaCount < gorillaLimit)
	{		
		cookieCount -= gorillaPrice;
		gorillaPrice *= 1.6;
		gorillaPrice = Math.ceil(gorillaPrice)
		gorilla_price_number.innerHTML = gorillaPrice;
		cookie_count.innerHTML = cookieCount;
		gorillaCount++;
		gorilla_count.innerHTML = "Gorillas: " + gorillaCount;
		updateClickSpeed();
		
		if (gorillaCount >= gorillaLimit)
		{
			gorilla_price.innerHTML = "limit";
		}
	}
}

mice_new.onclick = function()
{
	if (miceCount < miceLimit && cookieCount >= micePrice.price)
	{
		cookieCount -= micePrice.price;
		miceCount++;
		holdClickSpeed++;
		mice_count.innerHTML = "Mice: " + miceCount;
		micePrice = micePrice.next;
		
		if (miceCount == miceLimit)
		{
			mice_price.innerHTML = "limit";
			return;
		}
		
		mice_price_number.innerHTML = micePrice.price;
	}
}

setInterval(function() {
	// Friends
	cookieCount += friendCount;
	cookie_count.innerHTML = cookieCount;
}, 15000)

setInterval(function() {
	// Bakers
	cookieCount += bakerCount;
	cookie_count.innerHTML = cookieCount;
}, 1400)

setInterval(function() {
	// Grannys
	cookieCount += grannyCount;
	cookie_count.innerHTML = cookieCount;
}, 130)

setInterval(function() {
	// CMs
	for (var obj of cmObjects)
	{
		cookieCount += obj;
	}
	
	cookie_count.innerHTML = cookieCount;
}, 90)

setInterval(function() {
	// CMs increase
	for (var i = 0; i < cmObjects.length; i++)
	{
		if (cmObjects[i] < 34)
		{
			cmObjects[i] = cmObjects[i] + 1;
		}
	}
	
	cookie_count.innerHTML = cookieCount;
	updateSecondSpeed()
}, 3000)

setInterval(function() {
	//gorilla horde
	if (gorillaCount >= gorillaLimit)
	{
		gh_active.classList.add("active");
		gorillaHordeMultiplier = 9;
		updateClickSpeed();
		setTimeout(function() {
			gorillaHordeMultiplier = 1;
			updateClickSpeed();
			gh_active.classList.remove("active");
		}, 6000)
	}
	
}, 90000)

setInterval(function() {
	if (!complete && startTime !== null)
	{
		if (cookieCount >= 1000000)
		{
			alert("You've reached a million cookies!\nYour time is at the top right corner.");
			complete = true;
			return;
		}
		
		endTime = Date.now();
		time.innerHTML = new Date(endTime - startTime).toISOString().substr(14, 7);
	}
}, 80);