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
            <div className="bg-white px-5 py-3 rounded-lg shadow-sm border border-stone-300">
              {users.map((user: any) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          )}

          <UpgradePlan />
        </div>
      )}
    </div>
  );
}
