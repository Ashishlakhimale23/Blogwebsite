

import {useState,useEffect, ReactNode,ReactElement} from 'react';
import { AlertTriangle } from 'lucide-react';
import { Components,Block } from '../type/types';

const Image = ({ url, caption, alt = '' }:{url:string,caption:string,alt:string}) => {
  if (!url) return null;
  
  return (
    <figure className="my-6 w-full">
      <img 
        src={url} 
        alt={alt || caption || 'Blog image'} 
        className="w-full h-auto rounded-lg shadow-lg" 
        loading="lazy"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-zinc-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const Quote = ({ quote, caption }:{quote:string,caption:string}) => {
  if (!quote) return null;

  return (
    <blockquote className="my-6 border-l-4 border-red-400 bg-zinc-800/50 rounded-r-lg">
      <div className="p-4 italic text-lg text-zinc-200">
        {quote}
      </div>
      {caption && (
        <footer className="px-4 pb-4 text-sm text-zinc-400">
          — {caption}
        </footer>
      )}
    </blockquote>
  );
};

const List = ({ style = "unordered", items = [] }) => {
  if (!items?.length) return null;

  const ListComponent = style === "ordered" ? "ol" : "ul";
  
  return (
    <ListComponent 
      className={`my-6 pl-8 space-y-3 font-display ${
        style === "ordered" ? "list-decimal" : "list-disc"
      }`}
    >
      {items.map((item, i) => (
        <li 
          key={i}
          dangerouslySetInnerHTML={{ __html: item }}
          className="text-zinc-300  text-lg leading-relaxed"
        />
      ))}
    </ListComponent>
  );
};

const Code = ({ code, language }:{code : string,language:string}) => {
  if (!code) return null;

  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <div className="bg-zinc-700 px-4 py-2 text-sm text-zinc-300">
        {language || 'Code'}
      </div>
      <pre className="bg-zinc-800 p-4 overflow-x-auto">
        <code 
          dangerouslySetInnerHTML={{ __html: code }}
          className="text-[15px] leading-relaxed font-mono  text-white"
        />
      </pre>
    </div>
  );
};

const ErrorBoundary = ({ children }:{children : ReactNode}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
        <AlertTriangle size={20} />
        <span>Failed to render content block</span>
      </div>
    );
  }

  return children;
};

enum HeaderLevel {
  H2 = 2,
  H3 = 3,
  H4 = 4,
}

type Sizes = Record<HeaderLevel, string>;


type HeaderProps = {
  level?: HeaderLevel; // `level` is optional and defaults to 2
  text: string;
};

const Header = ({ level = 2, text }: HeaderProps): ReactElement | null => {
  if (!text) return null;

  // Define the sizes for each header level
  const sizes: Sizes = {
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-4xl',
  };

  // Dynamically create the heading tag (e.g., h2, h3, h4)
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: text }}
      className={`${sizes[level]} font-display text-white font-bold my-6`}
    />
  );
};

const Paragraph = ({ text }:{text:string}) => {
  if (!text) return null;

  return (
    <p
      dangerouslySetInnerHTML={{ __html: text }}
      className="text-zinc-300 font-display text-lg leading-relaxed my-4"
    />
  );
};



const BlogParser = ({ block }:{block:Block}) => {
  if (!block?.type || !block?.data) {
    return null;
  }

  const { type, data } = block;

  const components :Components= {
    paragraph: () => <Paragraph text={data.text || ""} />,
    image: () => <Image url={data.file?.url || ""} caption={data.caption || ""} alt={data.caption || ""} />,
    header: () => <Header level={data.level || 2} text={data.text || ""} />,
    quote: () => <Quote quote={data.text || ""} caption={data.caption || ""} />,
    code: () => <Code code={data.code || ""} language={data.language || ""} />,
    list: () => <List style={data.style} items={data.items || []} />
  };

  const Component = components[type];

  if (!Component) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};

export default BlogParser;