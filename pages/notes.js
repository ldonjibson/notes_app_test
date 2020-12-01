// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import Layout from '../components/Layout';
import Notes from '../components/Notes';
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data) 

const HomePage = (props) => {
  const { data, error } = useSWR('https://noteappit.herokuapp.com/api/v1/note?format=json', fetcher)
  console.log(data, error)

	if (error) return (
			<Layout >
				<div className="container text-center"><h1>Failed to load api data</h1></div>
			</Layout>
		);


	if (!data) return (
		<Layout>
			<div className="container text-center"><h1>Loading....</h1></div>
		</Layout>
		);

	return (
		<Layout >
			<div className="container text-center"><h1>My Notes</h1></div>
			<Notes getNotes={ data } />
		</Layout>
		);
}
	


// HomePage.getInitialProps = async () => {
// 	const res = await axios
// 		.get('https://api.coindesk.com/v1/bpi/currentprice.json')
// 		.then((data) => {
// 			console.log(data.data.bpi)
// 			return {
// 				bpi: data.data.bpi
// 			}
// 		})
// 		.catch(
// 			(error) => console.log(error)
// 		);
// 	return res

// }

export default HomePage;