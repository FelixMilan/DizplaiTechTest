# DizplaiTechTest

How to run:
1> Open terminal or Command Prompt and navigate to DizplaiTechTest
2> run: node server.js
3> Open localhosst:3000 in browser
4> Click on an option then 'submit' to vote, return to vote using 'vote again' button, votes will be counted as long as server isn't closed

Things to finish:
> Adjusting results width, they currently don't behave the same as buttons in terms of width.
> Slight adjustments to styling of text to better fit the example images
> Play around with background image, not certain that adjusting based of view height and width is the best course of action
> Add in database, hosted either locally or on the cloud, to retain data once the local host is closed, currently no data stays between restarts of the server
> Adjust code to not allow %s to equal higher than 100% (ie. 63%, 25%, 13% from rounded decimal places)

Testing methods:
> Trial and error/bruteforce testing was how I tested both the front and backend of this task
> For a larger task I would implement both unit tests and integration tests, developing in a TTD methos to ensure that the development was lead through rigourous testing diciplines, and that all new units, functions, and capabilities worked before deployment.

Technologies used:
> Express.js for app framework and server as it's what I'm most familiar with
> JavaScript for reposinsive design
