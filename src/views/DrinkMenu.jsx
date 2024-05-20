import { useState } from "react";

const DrinkMenu = () => {
  const drinkMenu = [
    {
      id: 1,
      name: "珍珠奶茶",
      content: "香濃奶茶搭配QQ珍珠",
      price: 50,
      qty: 20,
    },
    {
      id: 2,
      name: "冬瓜檸檬",
      content: "清新冬瓜配上新鮮檸檬",
      price: 45,
      qty: 15,
    },
    {
      id: 3,
      name: "翡翠檸檬",
      content: "綠茶與檸檬的完美結合",
      price: 55,
      qty: 30,
    },
    {
      id: 4,
      name: "四季春茶",
      content: "香醇四季春茶，回甘無比",
      price: 45,
      qty: 10,
    },
    {
      id: 5,
      name: "阿薩姆奶茶",
      content: "阿薩姆紅茶搭配香醇鮮奶",
      price: 50,
      qty: 25,
    },
    {
      id: 6,
      name: "檸檬冰茶",
      content: "檸檬與冰茶的清新組合",
      price: 45,
      qty: 20,
    },
    {
      id: 7,
      name: "芒果綠茶",
      content: "芒果與綠茶的獨特風味",
      price: 55,
      qty: 18,
    },
    {
      id: 8,
      name: "抹茶拿鐵",
      content: "抹茶與鮮奶的絕配",
      price: 60,
      qty: 20,
    },
  ];

  const [menu, setMenu] = useState(drinkMenu);
  const [currentId, setCurrentId] = useState("");

  const handleCurrentId = (id, type) => {
    type === "edit" ? setCurrentId(id) : setCurrentId("");
  };

  // 庫存數量
  const handleQtyFn = (id, type) => {
    const newMenu = menu.map((drink) => {
      if (drink.id === id) {
        if (type === "minus") {
          return {
            ...drink,
            qty: drink.qty - 1,
          };
        }
        return {
          ...drink,
          qty: drink.qty + 1,
        };
      }
      return drink;
    });

    setMenu(newMenu);
  };

  // input
  const handleChangeInput = (e, id) => {
    const menuTemp = menu.map((item) => {
      return item.id === id ? { ...item, name: e.target.value } : item;
    });
    setMenu(menuTemp);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">飲料菜單</h1>
      <table>
        <thead>
          <tr>
            <th>品名</th>
            <th>內容</th>
            <th>價格</th>
            <th>數量</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((drink) => (
            <tr key={drink.id}>
              <td className="p-5">
                {drink.id === currentId ? (
                  <>
                    <input
                      className="form-input"
                      type="text"
                      value={drink.name}
                      onChange={(e) => handleChangeInput(e, drink.id)}
                    />
                    <br />
                    <button
                      type="button"
                      onClick={() => handleCurrentId(drink.id, "complete")}
                    >
                      完成
                    </button>
                  </>
                ) : (
                  <>
                    <p>{drink.name}</p>
                    <button
                      type="button"
                      onClick={() => handleCurrentId(drink.id, "edit")}
                    >
                      編輯
                    </button>
                  </>
                )}
              </td>

              <td>{drink.content}</td>
              <td>{drink.price}</td>
              <td>{drink.qty}</td>

              <td>
                <button
                  type="button"
                  onClick={() => handleQtyFn(drink.id, "minus")}
                >
                  -
                </button>

                <button
                  type="button"
                  onClick={() => handleQtyFn(drink.id, "add")}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinkMenu;
