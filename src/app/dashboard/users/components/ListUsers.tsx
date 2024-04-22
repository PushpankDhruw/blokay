"use client";
import { AppLoader } from "@/app/components/DS/Index";
import { fetchUsers } from "@/app/services/users";
import { useEffect, useState } from "react";
import UpgradePlan from "@/app/components/UI/UpgradePlan";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setUsers([]);
    setLoading(true);
    fetchUsers()
      .then((result: any) => {
        setUsers(result.Users);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="">
      {loading && (
        <div className="min-h-screen border-2 border-stone-300 rounded-xl flex items-center justify-center">
          <AppLoader size="md" />
        </div>
      )}
      {!loading && (
        <div>
          {users.length > 0 && (
            <div className="bg-white px-3 py-3 flex flex-col gap-4 rounded-lg shadow-sm border border-stone-300">
              {users.map((user: any) => (
                <div
                  key={user.id}
                  className="px-5 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-3"
                >
                  <div className="size-10 bg-stone-200 flex items-center justify-center rounded-full">
                    <img src="/logo.svg" className="w-full h-full" />
                  </div>
                  <div>{user.name}</div>
                </div>
              ))}
            </div>
          )}

          <UpgradePlan />
        </div>
      )}
    </div>
  );
}
