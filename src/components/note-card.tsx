import * as Dialog from "@radix-ui/react-dialog"; // Componente de modal
import { formatDistanceToNow } from "date-fns"; // Formatação de data
import { ptBR } from "date-fns/locale"; // Tradução das mensagens
import { X } from "lucide-react"; // Ícone de fechar

// Propriedades do componente
interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDelete: (id: string) => void;
}

export function NoteCard({ note, onNoteDelete }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* Título do card */}
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
          ...
        </span>
        {/* Textinho */}
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/40 to-black/0" />
      </Dialog.Trigger>

      {/* Modal */}
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="inset-0 fixed bg-black/40" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-red-700 p-1.5 text-slate-400 rounded-sm hover:bg-red-600">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            {/* Título do card */}
            <span className="text-sm font-medium text-slate-300">
              {/* Mostrando a quanto tempo essa data foi em relação a agora */}
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
              ...
            </span>
            {/* Textinho */}
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            onClick={() => onNoteDelete(note.id)}
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa anotação
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
