/**
 * @api {get} https://us-central1-partnership-app-e8d99.cloudfunctions.net/getProjects2
 * @apiName getProjects2
 * @apiGroup User
 *
 * @apiParam {String} uid Users unique Uid (Optional).
 *
 * @apiSuccess {String} name.
 * @apiSuccess {String} description.
 * @apiSuccess {String} bannerPath .
 * @apiSuccess {String} projectLocation.
 * @apiSuccess {String} logoPath.
 * @apiSuccess {String} dateOfCreation.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      "bannerPath": "https://image.shutterstock.com/z/stock-vector-old-retro-video-game-background-classic-retro-style-game-design-scenery-1198191838.jpg",
 *      "name": "super mario remake",
 *     "projectLocation": null,
 *      "logoPath": "https://vignette.wikia.nocookie.net/wavisddlegend/images/b/b0/Sans_Undertale.png/revision/latest?cb=20180502200331",
 *      "dateOfCreation": {
 *           "_seconds": 1558890330,
 *           "_nanoseconds": 64000000
 *      },
 * "description": "Fane de Mario, j'ai commencé..."
 */

/**
 * @api {get} /user/:id Request projects information
 * @apiName getProfile2
 * @apiGroup User
 *
 * @apiParam {String} uid Users unique Uid(Optional).
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "lastName": "Courneil",
 *       "firstName": "Lucas",
 *       "job": null,
 *       "cityLocation": null,
 *       "workLocation": null,
 *       "uid": "zcMrmxIc5HMfYE7eoCQsDWjbMZN2",
 *       "createdAt": {
 *           "_seconds": 1560510183,
 *           "_nanoseconds": 683000000
 *       },
 *       "studies": null
    }
 */

/**
 * @api {post} /user/:id Request projects information
 * @apiName postNotification
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       "lastName": "Courneil",
 *       "firstName": "Lucas",
 *       "job": null,
 *       "cityLocation": null,
 *       "workLocation": null,
 *       "uid": "zcMrmxIc5HMfYE7eoCQsDWjbMZN2",
 *       "createdAt": {
 *           "_seconds": 1560510183,
 *           "_nanoseconds": 683000000
 *       },
 *       "studies": null
    }
 */

/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProject2  projects creation
 * @apiName postProject2
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *       Création réussie
 *  }
 */

/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProfiles  profile creation and update
 * @apiName postProfiles
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *      Création réussie
    }
 */


/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProfiles  profile creation and update
 * @apiName addTag
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *      Création réussie
    }
 */

/**
 * @api {post} https://us-central1-partnership-app-e8d99.cloudfunctions.net/postProfiles  profile creation and update
 * @apiName addFriend
 * @apiGroup User
 *
 * @apiParam {String} body Notification body.
 * @apiParam {String} title Notification title.
 *
 * @apiSuccess {String} lastName.
 * @apiSuccess {String} firstName.
 * @apiSuccess {String} job .
 * @apiSuccess {String} cityLocation.
 * @apiSuccess {String} workLocation.
 * @apiSuccess {String} uid.
 * @apiSuccess {String} studies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *      Création réussie
    }
 */