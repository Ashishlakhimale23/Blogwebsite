import { useContext} from "react";
import Card from "../component/card";
import { UserContext } from "../context/context";


function Home () {
  const { initialinfo } = useContext(UserContext);
  return (
    <>
      <div className="flex w-full h-full items-center mt-16  max-w-4xl mx-auto p-4">
          {!initialinfo.blogs ? (
            <p className="text-4xl font-display font-bold text-black">NO BlOGS TO SHOW</p>
          ) : (
            initialinfo.blogs.map((blog, i) => (
              <>
              <div>
              <Card
                key={i}
                title={blog.title}
                banner={blog.banner}
                editorjs_data={blog.content}
                author={blog.author}
                publishedOn={blog.publishedOn}
                content={blog.content}
                id={blog._id}
                bookmarks={initialinfo.bookmarks}
                BlogLink={blog.BlogLink}

              ></Card>
              <hr />

</div>
</>
            ))
          )}
      </div>
    </>
  );
}
export default Home
