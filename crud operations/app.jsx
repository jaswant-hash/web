import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/students';

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', year: '' });
  const [editId, setEditId] = useState(null);

  const load = async () => setStudents(await (await fetch(API)).json());

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await fetch(editId ? `${API}/${editId}` : API, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', department: '', year: '' });
    setEditId(null);
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2>Student CRUD</h2>
      <form onSubmit={save}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <button>{editId ? 'Update' : 'Add'}</button>
      </form>

      <table border="1">
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>
                <button onClick={() => { setEditId(s.id); setForm(s); }}>Edit</button>
                <button onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}