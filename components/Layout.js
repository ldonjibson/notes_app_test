import Head from 'next/head';

const Layout = ( props ) => {

	return(

		<div>
			<Head>
				<title>My Notes</title>
				<link rel="stylesheet" href="https://bootswatch.com/4/superhero/bootstrap.min.css" />
				<link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
			</Head>
			<div className="container-fluid">
				{props.children}
			</div>
		</div>
)};

export default Layout;