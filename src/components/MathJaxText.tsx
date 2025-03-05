import { MathJax, MathJaxContext } from 'better-react-mathjax';
interface MathJaxTextProps {
  text: string;
}
export default function MathJaxText({text} : MathJaxTextProps) {
  const config = {
    tex2jax: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEscapes: true,
    }
  };

  return (
    <MathJaxContext config={config} version={2}>
      <MathJax
        dangerouslySetInnerHTML={{
          __html: text.replace(/\n/g, '<br />'),
        }}
      />
    </MathJaxContext>
  )
}