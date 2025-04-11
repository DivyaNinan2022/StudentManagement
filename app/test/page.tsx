"use client";
export default function TestPage() {
  const names = ["Alice", "Bob", "Charlie"];
  const obj = names.reduce<Record<number, string>>((acc, cur, index) => {
    acc[index] = cur;
    return acc;
  }, {});
  const namesObj = [
    {
      name: "Alice",
      email: "alice@alice.com",
      id: "id001",
    },
    {
      name: "Alice111",
      email: "alice111@alice.com",
      id: "id0011111",
    },
    {
      name: "Alice2222",
      email: "alice2222@alice.com",
      id: "id0012222",
    },
    {
      name: "Alice3333",
      email: "alice3333@alice.com",
      id: "id0013333",
    },
    {
      name: "Alice4444",
      email: "alice44443@alice.com",
      id: "id0013333",
    },
  ];

  const objs = namesObj?.reduce<Record<string, any>>((acc, cur, index) => {
    const key = cur.id;
  if(!acc[key]){
    acc[key] = {
      username:cur.name,
      mail:cur.email
    }
  }
    return acc;
  }, {});

  return <div className="flex h-screen items-center justify-center"></div>;
}
