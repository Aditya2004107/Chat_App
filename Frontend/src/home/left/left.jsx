import Search from "./search";
import Users from "./users";
const left = () => {
  return (
    <>
      <div className="w-[30%]  bg-black text-white">
        <h1 className="font-bold text-3xl p-2 px-11">Conversa</h1>
        <Search />
        <hr />
        <Users />
      </div>
    </>
  );
};

export default left;
