export default function Test({ headerData }) {
  console.log(headerData);
  return alert(headerData);
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:1337/api/slides?[populate]=*");
  const headerData = res.json();

  console.log(headerData);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      headerData,
    },
  };
}
