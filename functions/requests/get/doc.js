/**
{
*    get} /user/:id Request projects information
* @apiName getProjects2
* @apiGroup User
*
* @apiParam {String} uid Users unique Uid.
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
 *                },
* "description": "Fane de Mario, j'ai commencé..."
 */