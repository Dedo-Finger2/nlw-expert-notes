import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

const note = {
  date: new Date(),
  content: "Hello World!",
};

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      {/* Logo do projeto */}
      <img src={logo} alt="logo" />

      {/* Formulário de busca de anotações */}
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em usas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeolder:text-slate-500"
        />
      </form>

      {/* Separador */}
      <div className="h-px bg-slate-700" />

      {/* Grid com as anotações */}
      <div className="grid grid-cols-3 gap-4 auto-rows-[250px]">
        {/* Card para adicionar nova anotação */}
        <NewNoteCard />
        {/* Card de anotações */}
        <NoteCard note={note} />
      </div>
    </div>
  );
}
