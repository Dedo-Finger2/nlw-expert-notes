import * as Dialog from "@radix-ui/react-dialog"; // Componente de modal
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

// https://youtu.be/8TydWjnb0_s?t=2794

interface NewNoteCard {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCard) {
  // Varíável e função que altera ela usando um estado
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  // Função que executa a função do estado, com ela podemos usar em botões ou outros elementos
  function handleStartEditor() {
    setShouldShowOnboarding(false); // Ativa a textarea
  }

  // Retorna a frase de seleção de opção de escrever texto caso o usuário apague todo o texto
  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value); // Guardando o conteúdo do textarea

    if (event.target.value === "") {
      setShouldShowOnboarding(true); // Reseta o onborading
    }
  }

  // Função responsável por salvar uma anotação
  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (content === "") {
      toast.warning("Anotação sem conteúdo!");
      return;
    }

    onNoteCreated(content); // Cria a anotação

    setContent("");
    setShouldShowOnboarding(true);

    toast.success("Nova anotação criada!");
  }

  // Função responsável por começar a gravação
  function handleStartRecording() {
    const isSpeechRecognitionAPIAvaliable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvaliable) {
      alert(
        "API de reconhecimento de fala não é suportada pelo seu navegador."
      );
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecogninitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecogninitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  // Função responsável por parar a gravação
  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col text-left bg-slate-700 p-5 space-y-3 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* Título do card */}
        <span className="text-sm font-medium text-slate-200">
          Adicionar anotação
        </span>
        {/* Textinho */}
        <p className="text-sm leading-6 text-slate-400">
          Grave uma anotação em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      {/* Modal */}
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="inset-0 fixed bg-black/40" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-red-700 p-1.5 text-slate-400 rounded-sm hover:bg-red-600">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              {/* Título do card */}
              <span className="text-sm font-medium text-slate-300">
                Adicionar anotação
              </span>

              {/* Textinho */}
              {shouldShowOnboarding ? (
                <p className="leading-6 text-slate-400 text-sm">
                  Comece{" "}
                  <button
                    className="text-lime-400 font-medium hover:underline"
                    onClick={handleStartRecording}
                    type="button"
                  >
                    gravando uma anotação{" "}
                  </button>{" "}
                  em áudio ou se pereferir, {/* Usando o useState */}
                  <button
                    className="text-lime-400 font-medium hover:underline"
                    onClick={handleStartEditor}
                    type="button"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-slate-300 outline-none hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-500 py-4 text-center font-semibold text-lime-950 outline-none hover:bg-lime-600"
              >
                Salvar anotação
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
