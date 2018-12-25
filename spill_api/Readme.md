# SPILLapi

**GETs**
https://spillapi.mybluemix.net/users
https://spillapi.mybluemix.net/activities
https://spillapi.mybluemix.net/activitymembers
https://spillapi.mybluemix.net/groups
https://spillapi.mybluemix.net/groupactivities
https://spillapi.mybluemix.net/groupmembers
https://spillapi.mybluemix.net/items
https://spillapi.mybluemix.net/itemsInvited
https://spillapi.mybluemix.net/invitations

*Search parameters*

 - Users: name, mail
 - Activities: name, description, place
 - Groups: name, description
 - Items: name, description

*Usage examples: Searching for a user whose name contains Gale*
https://spillapi.mybluemix.net/users/name?s=Gale
Output:

    // https://spillapi.mybluemix.net/users/name?s=Gale
    
    {
      "status": 200,
      "error": null,
      "response": Array[1][
        {
          "userId": 38,
          "mail": "groukez@shutterfly.com",
          "username": "Gale",
          "password": "csLQb902"
        }
      ]

*Usage examples: Searching for an activity taking place in Nangerant*
https://spillapi.mybluemix.net/activities/place?s=Nangerang
Output:

   
    // https://spillapi.mybluemix.net/activities/place?s=Nangerang
    
    {
      "status": 200,
      "error": null,
      "response": Array[1][
        {
          "activityId": 3,
          "name": "Lunch",
          "description": "Optional impactful matrices",
          "date": "2019-01-06T09:29:04.000Z",
          "place": "Nangerang",
          "activityAdminId": 40
        }
      ]
    }



**POSTS**

*Activities*
https://spillapi.mybluemix.net/activities/new?name=OurNewActivity&description=Yaaay&date=2018-12-31
