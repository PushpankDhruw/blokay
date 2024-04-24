"use client";
import { useEffect, useState, useRef } from "react";
import { AppLoader } from "@/app/components/DS/Index";
import { fetchUsers, fetchUser } from "@/app/services/users";
import { viewList } from "@/app/services/brain";
import UpgradePlan from "@/app/components/UI/UpgradePlan";
import {
  AppCheckbox,
  AppModal,
  AppButton,
  AppSelect,
} from "@/app/components/DS/Index";

export default function Users() {
  const modalRef: any = useRef();
  const [users, setUsers] = useState([]);
  const [views, setViews] = useState([]);
  const [form, setForm]: any = useState({ permissions: {}, rol: "admin" });
  const [loading, setLoading] = useState(false);

  const listViews = () => {
    viewList().then((result) => {
      setViews(result.Views);
    });
  };

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

  const handleClickUser = (user: any) => {
    setLoading(true);
    fetchUser(user.id)
      .then((result: any) => {
        setForm(result.User);
      })
      .finally(() => {
        setLoading(false);
      });

    modalRef.current.showModal();
  };

  useEffect(() => {
    getUsers();
    listViews();
  }, []);

  return (
    <div className="flex flex-col gap-5">
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
                  onClick={() => handleClickUser(user)}
                  key={user.id}
                  className="px-5 py-2 rounded-lg hover:bg-stone-100 flex items-center gap-3"
                >
                  <div className="size-10 bg-stone-200 flex items-center justify-center rounded-full">
                    <img src="/logo.svg" className="w-full h-full" />
                  </div>
                  <div>
                    <div>{user.name}</div>
                    <div className="font-light text-sm">{user.rol}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <UpgradePlan />
        </div>
      )}

      <AppModal
        title="Asignar permisos"
        footer={
          <AppButton
            text="Guardar"
            // onClick={() => handleSaveView()}
            variant="primary"
            className="w-full"
            size="md"
          />
        }
        size="sm"
        ref={modalRef}
      >
        <AppSelect
          value={form.rol}
          label="Rol"
          className="mb-5"
          onChange={(val: string) => {
            setForm({ ...form, rol: val });
          }}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="user">Usuario</option>
        </AppSelect>

        {form.rol != "admin" && (
          <div className="gap-5 flex flex-col">
            {views.map((c: any) => (
              <div>
                <div className="items-center gap-2 flex mb-3">
                  <AppCheckbox
                    type="text"
                    value={
                      c.Views.length ==
                      c.Views.filter((v: any) => !!form.permissions[v.id])
                        .length
                    }
                    onChange={() => {
                      let newForm: any = {};
                      for (let index in c.Views) {
                        let item: any = c.Views[index];
                        newForm[item.id] = true;
                      }
                      setForm({
                        ...form,
                        permissions: { ...form.permissions, ...newForm },
                      });
                    }}
                  />
                  <h2>{c.name}</h2>
                </div>
                <div className="flex flex-col gap-1 pl-3">
                  {c.Views.map((v: any) => (
                    <div key={"view" + v.id}>
                      <AppCheckbox
                        type="text"
                        value={form.permissions[v.id]}
                        label={v.name}
                        onChange={() => {
                          setForm({
                            ...form,
                            permissions: {
                              ...form.permissions,
                              [v.id]: !form.permissions[v.id],
                            },
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </AppModal>
    </div>
  );
}
