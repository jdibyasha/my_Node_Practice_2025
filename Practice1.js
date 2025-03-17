//Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet.Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet.
import { useState, useRef } from "react";
export default function Accordion() {
	const [content, setContent] = useState([
		{
			id: 1,
			title: "HTML",
			desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser",
			show: false,
		},
		{
			id: 2,
			title: "CSS",
			desc: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
			show: false,
		},
		{
			id: 3,
			title: "Javascript",
			desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
			show: false,
		},
	]);
	const expandSection = (id) => {
		const updateContent = content.map((item, idx) => {
			if (item.id === id) {
				if (!item.show) {
					document.getElementById(id).innerHTML = "-";
					return { ...item, show: true };
				} else {
					document.getElementById(id).innerHTML = "+";
					return { ...item, show: false };
				}
			}
			return item;
		});
		setContent(updateContent);
	};
	return (
		<div>
			{content &&
				content.map((item) => (
					<div key={item.id}>
						{item.title}
						<button onClick={() => expandSection(item.id)} id={item.id}>
							+
						</button>
						<br />
						<span style={{ display: item.show ? "block" : "none" }}>
							{item.desc}
						</span>
					</div>
				))}
		</div>
	);
}
