# Link Union

Link Union is a web application designed for managing links from various sources. It allows users to save links along with a name, description, and tags. The application supports CRUD operations, user authentication (login and logout), user profiles, and contact forms. Additionally, it includes an about section, a list view for managing links, and the ability to print link lists as PDF files.

## Features

- Save links with name, description, and tags
- CRUD operations for managing links
- User authentication (login and logout)
- User profiles
- Contact form
- About section
- List view for managing links
- PDF export for link lists

## Installation

To install Link Union locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd link-union`
3. Install dependencies: `npm install`

## Usage

To run Link Union locally, use the following command: `ng serve`

Navigate to `http://localhost:4200/` in your web browser to access the application.

## Development

Link Union is built with Angular. To generate a new component, use the following command: `ng generate component component-name`

To build the project, run: `ng build`

## Local Database

Link Union uses a local JSON file to store link data. Follow these steps to set up and use the local database:

1. **JSON File**: I have created a JSON file named `db.json` in the root directory of the project. You can prepopulate it with some sample data.

2. **Service Setup**: The `userService` provided in the application handles CRUD operations for managing link data in the JSON file. The service uses the Angular `HttpClient` module to interact with the JSON file.

3. **Data Structure**: The link data stored in the JSON file follows a specific structure. Each link object should have properties for `name`, `description`, `tags`, etc. Ensure that the data structure matches the model used by the application.

4. **CRUD Operations**: The `userService` provides methods for performing CRUD operations on the link data. These methods include fetching all links, adding a new link, updating an existing link, and deleting a link.

5. **Integration with Components**: Components within the application use the `userService` to interact with the local database. For example, the list view component fetches links from the service and displays them in the UI.

By following these steps, you can effectively manage link data using a local JSON file within the Link Union application.

## JSON Mock Server

To simulate a backend API for your local database during development, you can use JSON Server. JSON Server allows you to quickly create a RESTful API from a JSON file, making it ideal for prototyping and testing frontend applications.

### Installation

To install JSON Server globally, run the following command:

`npm install -g json-server`

### Starting JSON Server

`json-server --watch db.json --port 3000`

### Usage

Once JSON Server is running, you can interact with your mock API using standard HTTP requests.

For example:

To fetch all links: GET `http://localhost:3000/links`

To fetch a specific link: `GET http://localhost:3000/links/{id}`

## Testing

To run unit tests, execute: `ng test`

To run end-to-end tests, use: `ng e2e`

## Screenshots

Home page
![App Screenshot](/Screenshots/Home-Page.png)

Sign In page
![App Screenshot](/Screenshots/Sign-In.png)

Sign Up page
![App Screenshot](/Screenshots/Sign-Up.png)

List View
![App Screenshot](/Screenshots/List-View.png)

Creat Bookmark option
![App Screenshot](/Screenshots/Create-Bookmark.png)

Edit Bookmark option
![App Screenshot](/Screenshots/Edit-Bookmark.png)

View Bookmark option
![App Screenshot](/Screenshots/View-Bookmark.png)

Delete all data option
![App Screenshot](/Screenshots/Delete-all.png)

Profile page
![App Screenshot](/Screenshots/Profile.png)

Contact Us page
![App Screenshot](/Screenshots/Contact-Form.png)

About Section page
![App Screenshot](/Screenshots/About-section.png)


## Contributing

Contributions to Link Union are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new pull request.

## Further Help

For more information on using Angular CLI, refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


