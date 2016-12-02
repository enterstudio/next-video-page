module.exports = `
	query ($from: Int, $limit: Int!) {
		video {
			hero: editorsPicks(limit: 1) {
				bodyHTML
				...teaserContent
			}
			editorsPicks(from: 1, limit: $limit) {
				...teaserContent
			}
			popular(limit: $limit) {
				...teaserContent
			}
		}
		world: tag(id: "MQ==-U2VjdGlvbnM=") {
			...sliceContent
		}
		markets: tag(id: "NzE=-U2VjdGlvbnM=") {
			...sliceContent
		}
		opinion: tag(id: "MTE2-U2VjdGlvbnM=") {
			...sliceContent
		}
		ftFeatures: tag(id: "NGQ2MWQ0NDMtMDc5Mi00NWExLTlkMGQtNWZhZjk0NGExOWU2-R2VucmVz") {
			...sliceContent
		}
		companies: tag(id: "Mjk=-U2VjdGlvbnM=") {
			...sliceContent
		}
		shortView: tag(id: "MjFjOTI0Y2YtNGFlOS00OTMzLWJhMjEtNjBjNjE2YTRhMmJi-QnJhbmRz") {
			...sliceContent
		}
		lex: tag(id: "YzhlNzZkYTctMDJiNy00NTViLTk3NmYtNmJjYTE5NDEyM2Yw-QnJhbmRz") {
			...sliceContent
		}
		lifeAndArts: tag(id: "MTQ4-U2VjdGlvbnM=") {
			...sliceContent
		}
		workAndCareers: tag(id: "MTI1-U2VjdGlvbnM=") {
			...sliceContent
		}
	}
`;
