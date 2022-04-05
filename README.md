# PERN Architecture 1

PostgreSQL Local
ElephantSQL
Node
node-postgres ('pg')
Express
Axios
React
-react-router-dom v6

## Features

Architectural template with all operations on single page.

Makes use of conditional rendering to create multi-pane display.

HOC wrapper provides params.

Custom Hooks make axios requests with useEffect to simulate lifecycle method.

Reducer and Context provided in <MainState /> component wrapper.

## Setup

New app needs new API key from image provider.

Simply create an account and an app with Unsplash.com, and find your API key in the settings for your newly created app.

Just copy and paste that key into a .env file, or your production environment variables, named UNSPLASH_API_KEY.

You should be good to go.

<!-- END of document -->
