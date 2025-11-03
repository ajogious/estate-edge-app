const PropertyPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  return <div>Property Page {id}</div>;
};

export default PropertyPage;
