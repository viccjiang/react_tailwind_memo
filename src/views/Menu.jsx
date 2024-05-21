const Menu = ({ menu, addCart }) => {
  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold text-primary">今天喝什麼</h2>
        <hr className="mt-2 mb-4" />
        <ul className="flex flex-wrap -mx-3">
          {menu.map((item) => {
            return (
              <li key={item.id} className="w-full md:w-1/2 lg:w-1/3 p-3">
                <div className="bg-white hover:bg-brown-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{item.content}</p>
                  <p className="text-lg text-primary mt-2">NT$ {item.price}</p>
                  <button
                    type="button"
                    className="border p-2 rounded-lg bg-primary text-white w-full mt-4 hover:bg-brown-dark hover:transition-all duration-300"
                    onClick={() => addCart(item)}
                  >
                    加到購物車
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Menu;
