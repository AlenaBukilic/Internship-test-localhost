const myData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => myData.push(...data));

const main = document.querySelector('#main');
let divArr = [];

window.onload = displayUsers;

// display all users with personal info (age, gender)

function displayUsers() {

	myData.forEach((element) => {

		const personBox = document.createElement('div');
		personBox.innerText = element['firstName'] + ' ' + element['surname'];
		personBox.classList.add('name');
		if(element['age'] != null) {

			const personBoxInfo = document.createElement('p');
			personBoxInfo.innerText = element['age'] + ' ' + element['gender'];
			personBoxInfo.classList.add('info');
			personBox.appendChild(personBoxInfo);
		}
		else {
			const personBoxInfo = document.createElement('p');
			personBoxInfo.innerText = element['gender'];
			personBoxInfo.classList.add('info');
			personBox.appendChild(personBoxInfo);	
		}

		main.appendChild(personBox);
		divArr.push(personBox);

		// friends info data, currently hidden
		const dataDiv = document.createElement('div');
		dataDiv.classList.add('dataMain');
		dataDiv.classList.add('hidden');
		personBox.appendChild(dataDiv);
		const directFriends = document.createElement('div');
		const firendsOfFriends = document.createElement('div');
		const suggestedFriends =document.createElement('div');
		directFriends.classList.add('dataChildren');
		firendsOfFriends.classList.add('dataChildren');
		suggestedFriends.classList.add('dataChildren');
		dataDiv.appendChild(directFriends);
		dataDiv.appendChild(firendsOfFriends);
		dataDiv.appendChild(suggestedFriends);
		directFriends.innerText = 'Direct Friends:';
		firendsOfFriends.innerText = 'Firends Of Friends:';
		suggestedFriends.innerText = 'Suggested Friends:';

		// for each user display list of friends and friends of friends
		for(j = 0; j < element['friends'].length; j++){
			const directFriend = document.createElement('p');
			directFriend.classList.add('friendNames');
			const friend = element['friends'][j];
			directFriend.innerText = myData[friend - 1]['firstName'] + ' ' + myData[friend - 1]['surname'];
			directFriends.appendChild(directFriend);
			for(k = 0; k < myData[friend-1]['friends'].length; k++){
				if(element['id'] != myData[friend-1]['friends'][k]){
					const friendFriend = document.createElement('p');
					friendFriend.classList.add('friendNames');
					const friendOf = myData[friend-1]['friends'][k];
					friendFriend.innerText = myData[friendOf - 1]['firstName'] + ' ' + myData[friendOf - 1]['surname'];
					firendsOfFriends.appendChild(friendFriend);
				}
			}
		}

		let bool = false;

		if(element['friends'].length > 1) {

			// for each user display list of suggested friends, if not disiplay 'none'
			for(x = 0; x < myData.length; x++){
				if(myData[x]['id'] != element['id']){
					if(findMatches(myData[x]['friends'], element['friends'])){
						const suggestedFriend = document.createElement('p');
						suggestedFriend.classList.add('friendNames');
						suggestedFriend.innerText = myData[x]['firstName'] + ' ' + myData[x]['surname'];	
						suggestedFriends.appendChild(suggestedFriend);
						bool = true;
					}
				}
			}
			if(bool == false){
				const suggestedFriend = document.createElement('p');
				suggestedFriend.classList.add('friendNames');
				suggestedFriend.innerText = 'None';	
				suggestedFriends.appendChild(suggestedFriend);	
			}
			bool = false;	
		}
		else {
			const suggestedFriend = document.createElement('p');
			suggestedFriend.classList.add('friendNames');
			suggestedFriend.innerText = 'None';	
			suggestedFriends.appendChild(suggestedFriend);	
		}
		
	});


	// display friends info on one particular user
	divArr.forEach(element => element.addEventListener('click',() => {

		divArr.forEach((element) => {

			if(element.classList == 'big'){
				element.classList.remove('big');
				element.classList.add('name');
				element.lastChild.classList.add('hidden');
			}
		});

		if(element.classList == 'name'){
			element.classList.remove('name');
			element.classList.add('big');
			element.lastChild.classList.remove('hidden');
		}

	}));


}

// check if 2 or more elements in the array match
function findMatches(arr1, arr2){

	let helpArr = [];
	
	for(i = 0; i < arr1.length; i++){
		for(j=0; j <arr2.length; j++){
			if(arr1[i] == arr2[j]){
				helpArr.push(arr1[i]);
			}
		}
	}

	if(helpArr.length >= 2){
		return true;
	}
	else
		return false;
}
