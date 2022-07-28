{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "stakater-cloud-docs-2.0.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "stakater-cloud-docs-2.0.labels.selector" -}}
app: {{ template "stakater-cloud-docs-2.0.name" . }}
group: {{ .Values.stakaterclouddocs-2.0.labels.group }}
provider: {{ .Values.stakaterclouddocs-2.0.labels.provider }}
{{- end -}}

{{- define "stakater-cloud-docs-2.0.labels.stakater" -}}
{{ template "stakater-cloud-docs-2.0.labels.selector" . }}
version: "{{ .Values.stakaterclouddocs-2.0.labels.version }}"
{{- end -}}

{{- define "stakater-cloud-docs-2.0.labels.chart" -}}
chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
release: {{ .Release.Name | quote }}
heritage: {{ .Release.Service | quote }}
{{- end -}}
