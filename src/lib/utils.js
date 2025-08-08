import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONTACT, PROFILE } from "./constants";
import profileJson from "./profile.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * personalQA
 * Q&A simples baseado em regras para responder perguntas sobre Renan Mocelin.
 * Em produção, isto pode ser substituído por um RAG leve ou uma API.
 * @param {string} question Texto da pergunta do usuário
 * @param {'pt'|'en'} lang Idioma
 * @returns {string|null} Resposta em texto ou null se não encontrado
 */
/**
 * personalQA
 * Q&A simples baseado em regras para responder perguntas sobre Renan Mocelin.
 * @param {string} question
 * @param {"pt"|"en"} lang
 * @param {{ experiences?: Array<{title:string,company:string,period:string,desc?:string,skills?:string[]}> }} extras
 */
export function personalQA(question, lang = "pt", extras = {}) {
  if (!question) return null;
  const q = question.toLowerCase();

  // Contatos
  if (
    /(linkedin|github|contato|whatsapp|telefone|where.*find.*you|contact)/.test(
      q
    )
  ) {
    const p = profileJson[lang] || profileJson.pt;
    return lang === "pt"
      ? `Você pode me encontrar em:\n• LinkedIn: ${p.contacts.linkedin}\n• GitHub: ${p.contacts.github}\n• WhatsApp: ${p.contacts.whatsapp}\n• Localização: ${p.location}`
      : `You can find me at:\n• LinkedIn: ${p.contacts.linkedin}\n• GitHub: ${p.contacts.github}\n• WhatsApp: ${p.contacts.whatsapp}\n• Location: ${p.location}`;
  }

  // Localização
  if (/(onde.*mora|onde.*está|location|based|cidade|city)/.test(q)) {
    const p = profileJson[lang] || profileJson.pt;
    return lang === "pt"
      ? `Estou baseado em ${p.location}.`
      : `I'm based in ${p.location}.`;
  }

  // Formação
  if (
    /(formação|educação|college|university|graduação|pos|education)/.test(q)
  ) {
    const p = profileJson[lang] || profileJson.pt;
    const lines = (p.education || []).map(
      (e) => `${e.title} • ${e.org} • ${e.period}`
    );
    return lang === "pt"
      ? `Minha formação:\n• ${lines.join("\n• ")}`
      : `My education:\n• ${lines.join("\n• ")}`;
  }

  // Habilidades principais
  if (/(skills|habilidades|tecnologias|stack|competências)/.test(q)) {
    const p = profileJson[lang] || profileJson.pt;
    const skills = (p.skills || []).join(", ");
    return lang === "pt"
      ? `Habilidades principais: ${skills}.`
      : `Core skills: ${skills}.`;
  }

  // Quem é / Sobre / Tagline
  if (
    /(quem\s*é\s*(o\s*)?renan|quem\s*é\s*você|who\s*is\s*renan|who\s*are\s*you|sobre\s*(mim|renan)|about\s*(me|renan)|resumo|bio|biografia|sumário)/.test(
      q
    ) ||
    /(o que faz|especialista|áreas|what.*do.*you.*do|about.*you)/.test(q)
  ) {
    const p = profileJson[lang] || profileJson.pt;
    return p.summary || (lang === "pt" ? PROFILE.taglinePt : PROFILE.taglineEn);
  }

  // Experiência
  if (
    /(experiên|experien|carreira|trajetór|work\s*experience|career)/.test(q)
  ) {
    const experiences = Array.isArray(extras.experiences)
      ? extras.experiences
      : [];
    if (experiences.length) {
      const header = lang === "pt" ? "Minha experiência:" : "My experience:";
      const lines = experiences
        .slice(0, 3)
        .map((e) => `${e.title} • ${e.company} • ${e.period}`);
      return `${header}\n• ${lines.join("\n• ")}`;
    }
  }

  return null;
}
