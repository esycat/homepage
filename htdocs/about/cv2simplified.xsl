<?xml version="1.0" ?>

<xsl:stylesheet version="1.0"
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html" encoding="utf-8" indent="no" omit-xml-declaration="yes"
		doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
		doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" />

	<xsl:template match="/">
		<xsl:apply-templates select="*" />
	</xsl:template>

	<!-- Magic Templates -->
	<xsl:template match="*">
		<xsl:copy>
			<xsl:apply-templates select="@*" />
			<xsl:apply-templates />
		</xsl:copy>
	</xsl:template>

	<xsl:template match="text()">
		<xsl:value-of select="." disable-output-escaping="yes" />
	</xsl:template>

	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>

	<!-- Custom rules -->
	<xsl:template match="body/dl/dd/ul[@class='inline']">
		<xsl:for-each select="li">
			<xsl:apply-templates />
			<xsl:if test="position() != last()">
				<xsl:text>, </xsl:text>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- Eliminating all scripts, comments and horizontal dividers -->
	<xsl:template match="script" />
	<xsl:template match="comment()" />
	<xsl:template match="body/hr" />
	<xsl:template match="*[contains(@class, 'hidden')]" />
	<xsl:template match="*[contains(@class, 'non-printable')]" />

</xsl:stylesheet>
