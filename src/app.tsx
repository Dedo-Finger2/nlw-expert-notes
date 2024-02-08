import { ChangeEvent, useState } from "react";
import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  // Função que vem de outro lugar pra criar anotações
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    // Criando um novo array com o restante das anotações e a nossa nova anotação
    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    // Guardando no localstorage
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onNoteDelete(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  // Função que alimenta a variável de estado de busca de anotações
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  // Anotações filtradas
  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      {/* Logo do projeto */}
      <img src={logo} alt="logo" />

      {/* Formulário de busca de anotações */}
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em usas notas..."
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeolder:text-slate-500"
        />
      </form>

      {/* Separador */}
      <div className="h-px bg-slate-700" />

      {/* Grid com as anotações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
        {/* Card para adicionar nova anotação */}
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {/* Cards de anotações */}
        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDelete={onNoteDelete} />
          );
        })}
      </div>
    </div>
  );
}
