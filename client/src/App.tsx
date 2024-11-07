function App() {
  return (
    <>
      <form
        action="http://localhost:8000/api/images/extract"
        method="post"
        encType="multipart/form-data"
      >
        <input name="image" type="file" accept=".jpg,.jpeg,.png" />
        <button type="submit">Submit Photo</button>
      </form>
    </>
  );
}

export default App;
