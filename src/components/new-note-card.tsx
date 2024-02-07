import * as Dialog from "@radix-ui/react-dialog"; // Componente de modal
import { X } from "lucide-react";

export function NewNoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col text-left bg-slate-700 p-5 space-y-3 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* Título do card */}
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        {/* Textinho */}
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      {/* Modal */}
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="inset-0 fixed bg-black/40" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-red-700 p-1.5 text-slate-400 rounded-sm hover:bg-red-600">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            {/* Título do card */}
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>
            {/* Textinho */}
            <p className="leading-6 text-slate-400 text-sm">
              Comece{" "}
              <button className="text-lime-400 font-medium hover:underline">
                gravando uma nota{" "}
              </button>
              em áudio ou se pereferir,{" "}
              <button className="text-lime-400 font-medium hover:underline">
                utilize apenas texto
              </button>
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-lime-500 py-4 text-center text-lime-950 outline-none hover:bg-lime-600"
          >
            Salvar nota
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
